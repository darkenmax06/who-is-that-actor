const path = require("path")
const multer = require("multer")
const { v4: uuid } = require("uuid")
const getMegaBites = require("./utils/getMegaBites")

const IMAGES_ROUTE = path.join(__dirname, "public/images")

const storage = multer.diskStorage({
	destination: IMAGES_ROUTE,
	filename: (req, file, cb) => {
		const extName = path.extname(file.originalname)
		const name = uuid() + "-" + extName
		cb(null, name)
	}
})

const config = multer({
	storage,
	dest: IMAGES_ROUTE,
	fileFilter: (req, file, cb) => {
		const acceptFiles = /jpg|jpeg|png|gif|webp/

		const mimetype = file.mimetype
		const extName = path.extname(file.originalname)

		const testExtName = acceptFiles.test(extName)
		const testMimetypes = acceptFiles.test(mimetype)

		if (testExtName && testMimetypes) return cb(null, true)
		cb({ name: "FILE_NOT_VALID" }, false)
	},
	limits: {
		fileSize: getMegaBites(0.1)
	}
}).single("image")

module.exports = config