const { model, Schema } = require("mongoose")

const schema = new Schema({
	name: String,
	description: String,
	date: Date,
	imgUri: String,
	actors: [{
		type: Schema.Types.ObjectId,
		ref: "Actor"
	}],
	genero: String,
	director: {
		type: Schema.Types.ObjectId,
		ref: "Actor"
	},
	recaudacion: String,
	type: String
})

schema.set("toJSON", {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = model("Movie", schema)