//IMport express framework
const express = require('express');

//Import the database object with all the db action methods
const db = require('../data/db.js');

const router = express.Router();

//Write all the http methods for this route, for blog posts

router.get('/', (req, res) => {
    res.status(200).send('router is working');
})



module.exports = router;