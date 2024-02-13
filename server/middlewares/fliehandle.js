const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now(); 
        const fileExtension = path.extname(file.originalname); 
        const newFilename = `${timestamp}${fileExtension}`; 
        cb(null, newFilename); 
    }
});

const upload = multer({ storage: storage }); 

function fileUploadMiddleware(req, res, next) {
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({ message: 'Upload error occurred', toaststatus: "error" });
        } else if (err) {
            return res.status(500).json({ message: 'Unknown error occurred', toaststatus: "error" });
        }
        next();
    });
}

module.exports = fileUploadMiddleware;
