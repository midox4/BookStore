const router = require("express").Router();
require("dotenv").config();
const PhotoUpload = require("../Middlewares/PhotoUpload");
const { AJOUTER_USER , AUTH, LOGOUT,GET_USER,UPDATE_USER_PHOTO } = require("../authcontrollers/user");
const { verifyToken } = require("../utils/verifyToken");

// ADD USER
router.post('/AJOUTER', AJOUTER_USER)


// AUTH USER
router.post('/AUTH', AUTH)

// LOGOUT USER
router.post('/LOGOUT', LOGOUT)

// GET USER
router.get('/GET', verifyToken , GET_USER)


// UPDATE USER PHOTO 
router.put('/UPDATE-PHOTO/:id' , verifyToken, PhotoUpload.single("image"), UPDATE_USER_PHOTO)


module.exports = router
