const { model, Schema } = require("mongoose")

const schema = new Schema({
	name: String,
	description: String,
	date: Date,
	imgUri: String,
	movies: [{
		type: Schema.Types.ObjectId,
		ref: "Movie"
	}],
	type: String
})

schema.set("toJSON", {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = model("Actor", schema)