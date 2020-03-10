//IMport express framework
const express = require('express');

//Import the database object with all the db action methods
const db = require('../data/db.js');

const router = express.Router();

//Write all the http methods for this route, for blog posts

router.get('/', async (req, res) => {
    try {
        let posts = await db.find()
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let posts = await db.findById(req.params.id)
        if (posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else {
            const post = posts[0];
            res.status(200).json(post)
        }
    } catch {
        res.status(500).json({ error: "Internal server error. The posts information could not be retrieved." })
    }
})


router.get('/:id/comments', async (req, res) => {
    let posts = await db.findById(req.params.id);
    if (posts.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else {
        let comments = await db.findPostComments(req.params.id);
        if (comments.length > 0) {
            res.status(200).json(comments)
        }
        else {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        }
    }
})





//Export the router for the server.js
module.exports = router;