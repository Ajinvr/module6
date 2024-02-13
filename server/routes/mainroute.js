const express = require("express");
const router = express.Router()
const file = require("../controllers/filecontroller");
const fileUploadMiddleware = require("../middlewares/fliehandle");


router.route("/").post(fileUploadMiddleware,file.addFile)
router.route("/get").post(file.getFile)





module.exports = router