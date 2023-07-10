const mongoose = require("mongoose")

const {
  NODE_ENV,
  DEVELOPMENT_URI,
  PRODUCTION_URI
} = process.env

const uri = NODE_ENV === "development"
  ? DEVELOPMENT_URI
  : PRODUCTION_URI


mongoose.connect(uri)
  .then(() => console.log("database connected"))
  .catch(err => console.log(err))