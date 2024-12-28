const express = require("express");
// const {createPorjectController, getAllProjectController} = require('./../Controllers/projectController')
const upload = require('../Middleware/multerConfig.js')
const {createProjectController , getAllProjectController, deleteProjectController} = require("../Controllers/projectController")
const uploadImageToCloudinary = require('../Middleware/cloudinaryMiddleware')
const router= express.Router();

router.post('/add-project', upload.single('image'), uploadImageToCloudinary, createProjectController);

router.get("/",getAllProjectController);
router.delete("/projects/:projectId", deleteProjectController);


module.exports= router;

