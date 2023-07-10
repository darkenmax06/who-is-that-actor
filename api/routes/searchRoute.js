const router = require("express").Router()
const Movie = require("../models/Movie")
const Actor = require("../models/Actor")

router.post("/", async(req,res)=>{
	const {query} = req.body
	if (!query) res.json([])

	const searchRegex = new RegExp(query || "" ,"i")

	const movies = await Movie.find({name: searchRegex}, "name imgUri")
	const actors = await Actor.find({name: searchRegex}, "name imgUri")

	const jsonMovies = movies.map(movie=> movie.toJSON() )
	const jsonActors = actors.map(actor=> actor.toJSON() ) 

	const result = [...jsonMovies, ...jsonActors]

	res.json(result)
})

module.exports = router