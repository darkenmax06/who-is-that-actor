require("dotenv").config()
require("./db")

const express = require("express")
const cors = require("cors")
const searchRoute = require("./routes/searchRoute")
const movieRoute = require("./routes/movieRoute")
const actorRoute = require("./routes/actorRoute")
const ErrorHandling = require("./errorHandler")

//app
const app = express()

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use("/api",express.static(__dirname + "/public"))
app.use("/api/movies", movieRoute)
app.use("/api/searchs", searchRoute)
app.use("/api/actors", actorRoute)
app.use(ErrorHandling)

//server
const port = process.env.PORT || 3000
app.listen(port, () => console.log("server on port " + port))