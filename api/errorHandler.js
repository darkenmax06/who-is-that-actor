
function ErrorHandling(err, req, res, _) {
	const { name } = err

	console.log("error Name; " + name)
	console.log("error: " + err)

	const errors = {
		"MISSING_DATA": ()=> res.status(400).json({error: "faltan algunos datos necesarios para realizar esta accion"}),
		"INVALID_ID": ()=> res.status(400).json({error: "la id es incorrecta, eso puede ser porque el recurso ha sido eliminado o no exist"}),


		//multer errors
		"MulterError": ()=> res.status(400).json({error: err.message}),
		//mongoose errors 
		"CastError": ()=> res.status(400).json({error: "La id esta malFormada"}),
		"DEFAULT_ERROR": ()=> res.status(500).json({error: "ha ocurrido un error con el servidor"})
	}

	return errors[name] 
		? errors[name]()
		: errors["DEFAULT_ERROR"]()
}

module.exports = ErrorHandling