const router = require("express").Router();
require("dotenv").config();
const { AJOUTER_BOOK ,UPDATE_BOOK ,DELETE_BOOK, GET_BOOK_BY_ID , GET_ALL_BOOK , FAVORITE_BOOK } = require("../authcontrollers/book");
const {verifyToken} =require('../utils/verifyToken')

// ADD BOOK
router.post('/AJOUTER', verifyToken ,  AJOUTER_BOOK)

// UPDATE BOOK
router.put('/UPDATE/:id', verifyToken ,  UPDATE_BOOK)

// FAVORITE BOOK
router.put('/FAVORITE/:id', verifyToken ,  FAVORITE_BOOK)

// DELETE BOOK
router.delete('/DELETE/:id', verifyToken ,  DELETE_BOOK)

// GET BOOK BY ID
router.get('/GET/:id', verifyToken ,  GET_BOOK_BY_ID)

// GET ALL BOOK
router.get('/GET_ALL', verifyToken ,  GET_ALL_BOOK)


module.exports = router
