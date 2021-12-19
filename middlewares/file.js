const multer = require('multer')

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg"
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        MIME_TYPE_MAP[file.mimetype]
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload 