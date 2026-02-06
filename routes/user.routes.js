//express 
const express = require('express');
const { signup,signin } = require('../controllers/user.constrollers');
//router
const router = express.Router();
//endpoints
//HTTP
/*
GET -- RETRIEVAL OF DATA
POST - CREATING NEW DOCUMENT
PUT/PATCH - UPDATING DOCUMENTS
DELETE - DELETING DOCUMENTS
*/
router.post("/register",signup);
router.post("/login",signin);
//export
module.exports = router;
