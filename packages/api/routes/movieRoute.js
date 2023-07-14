const router = require("express").Router()
const config = require("../multer.config")
const Movie = require("../models/Movie")
const Actor = require("../models/Actor")
const fs = require("fs/promises")
const path = require("path")

router.get("/", async (req, res) => {
	const movies = await Movie.find({}, "imgUri name")
		.populate("actors",{
			name: 1,
			imgUri: 1
		})
	res.json(movies)
})


router.get("/pages/:page?/:limit?/", async(req,res)=>{
	const {page, limit} = req.params
	const {search} = req.body
	const skip = page*limit

	const searchRegex = new RegExp(search || "", "i")

	const movies = await Movie.find({name :searchRegex}, "imgUri name type")
		.skip(skip)
		.limit(limit)

	res.json(movies)
})


router.get("/id/:id", async (req, res,next) => {
	const {id} = req.params
	if (!id) return next({name: "MISSING_DATA"})

	let movie = null

	try {
		movie = await Movie.findById(id)
			.populate("actors",{
				name: 1,
				imgUri: 1,
				type: 1
			})
	}
	catch(err) {return next(err)}

	if (movie == null) return next({name:"INVALID_ID"})

	res.json(movie)
})

router.post("/", config, async (req, res, next) => {
	const { name, description, date, genero, recaudacion } = req.body
	const {file} = req

	if (
		!name || 
    !description || 
    !date || 
    !file ||
    !genero ||
    !recaudacion 
	) return next({ name: "MISSING_DATA" })

	const getDate = new Date(date)

	const movie = new Movie({
		name,
		description,
		date: getDate,
		imgUri: "/images/" + file.filename,
		genero,
		recaudacion,
		type: "movie"
	})

	try{
		const savedMovie = await movie.save()
		res.json(savedMovie)
	}catch(err) {next(err)}
})

router.delete("/:id", async (req, res, next) => {
	const { id } = req.params
	if (!id) return next({name: "MISSING_ID"})

	let movie = null
	try{
		movie = await Movie.findById(id)
	}catch(err){return next(err)}

	if (movie == null) return next({name: "INVALID_ID"})

	let actors = movie.actors
	for (let actorId of actors){
		const actor = await Actor.findById(actorId)
		actor.movies = actor.movies.filter(movieId => movieId.toString() != id)
		await actor.save()
	}

	try{
		const imgUri = path.join(__dirname, "../public/" + movie.imgUri)
		fs.unlink(imgUri).then(()=>console.log("Image deleted: "+ imgUri))
	}catch(err){return next(err)}

	try{
		await Movie.findByIdAndDelete(id)
		res.json({message: "pelicula eliminada"})
	}catch(err){return next(err)}
})

module.exports = router
