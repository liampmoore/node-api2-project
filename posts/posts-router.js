//IMport express framework
const express = require('express');

//Import the database object with all the db action methods
const db = require('../data/db.js');

const router = express.Router();

//Write all the http methods for this route, for blog posts

router.get('/', async (req, res) => {
    const posts = await db.find();
    res.status(200).json(posts)
})


//Export the router for the server.js
module.exports = router;