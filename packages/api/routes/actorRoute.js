const router = require("express").Router()
const config = require("../multer.config")
const Actor = require("../models/Actor")
const Movie = require("../models/Movie")

router.get("/", async (req, res) => {
	const actors = await Actor.find({}, "name imgUri").populate("movies",{
		name:1,
		imgUri: 1
	})
	res.json(actors)
})


router.get("/:id", async (req, res,next) => {
	const {id} = req.params
	if (!id) return next({name: "MISSING_DATA"})

	let actor = null

	try {
		actor = await Actor.findById(id)
			.populate("movies",{
				name:1,
				imgUri: 1
			})
	}
	catch(err) {return next(err)}

	if (actor == null) return next({name:"INVALID_ID"})

	res.json(actor)
})

router.post("/", config, async (req, res, next) => {
	const { name, description, date } = req.body
	const {file} = req
	if (!name || !description || !date || !file) return next({ name: "MISSING_DATA" })

	const getDate = new Date(date)

	const actor = new Actor({
		name,
		description,
		date: getDate,
		imgUri: "/images/" + file.filename,
		type: "actor"
	})

	try{
		const savedMovie = await actor.save()
		res.json(savedMovie)
	}catch(err) {next(err)}
})

router.post("/match", async(req,res,next)=>{
	const {actorId, movieId} = req.body
	console.log(req.body)
	if (!actorId || !movieId) return next({name: "MISSING_DATA"})

	let actor = null
	let movie = null

	try{
		actor = await Actor.findById(actorId)
		movie = await Movie.findById(movieId)
	}catch(err) {return next(err)}

	if (actor == null || movie == null) return next({name: "INVALID_ID"})
	if (actor.movies.includes(movieId)) return next({name: "MATCH_EXISTS"})

	actor.movies = [...actor.movies, movieId]
	movie.actors = [...movie.actors, actorId]

	try{
		const newActor = await actor.save()
		await movie.save()
		res.json(newActor)
	}catch(err){next(err)}

} )

module.exports = router