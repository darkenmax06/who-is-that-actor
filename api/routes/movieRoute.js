const router = require("express").Router()
const config = require("../multer.config")
const Movie = require("../models/Movie")

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

	const movies = await Movie.find({name :searchRegex}, "imgUri name")
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
				imgUri: 1
			})
	}
	catch(err) {return next(err)}

	if (movie == null) return next({name:"INVALID_ID"})

	res.json(movie)
})

router.post("/", config, async (req, res, next) => {
	console.log(req.body)
	console.log(".")
	console.log(req.file)
	const { name, description, date } = req.body
	const {file} = req
	if (!name || !description || !date || !file) return next({ name: "MISSING_DATA" })

	const getDate = new Date(date)

	const movie = new Movie({
		name,
		description,
		date: getDate,
		imgUri: "/images/" + file.filename,
		type: "movie"
	})

	try{
		const savedMovie = await movie.save()
		res.json(savedMovie)
	}catch(err) {next(err)}
})

module.exports = router
