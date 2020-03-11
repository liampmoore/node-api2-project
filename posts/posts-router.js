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
    try {
        let posts = await db.findById(req.params.id);
        if (posts.length === 0) {
            res.status(404).json({ message: `The post with the ID ${req.params.id} does not exist.` })
        }
        else {
            let comments = await db.findPostComments(req.params.id);
            if (comments.length > 0) {
                res.status(200).json(comments)
            }
            else {
                res.status(404).json({ error: `Could not find any comments for post id ${req.params.id}.` })
            }
        }
    } catch {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    }
})

router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        try {
            let id = await db.insert(req.body)
            let post = await db.findById(id)
            res.status(200).json(post)
        }
        catch {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        }
    }
})

router.post('/:id/comments', async (req, res) => {
    if (!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else {
        try {
            let posts = await db.findById(req.params.id)
            if (posts.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                let id = await db.insertComment({ ...req.body, post_id: req.params.id });
                let comments = await db.findCommentById(id);
                res.status(201).json(comments[0])
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        }
    }
})

router.put('/:id', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        try {
            await db.update(req.params.id, req.body)
            let posts = await db.findById(req.params.id)
            res.status(200).json(posts[0])
        }
        catch {
            res.status(500).json({ error: "The post information could not be modified." })
        }
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let posts = await db.findById(req.params.id)
        if (posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else {
            const post = posts[0];
            await db.remove(req.params.id)
            res.status(200).json(post)
        }
    } catch {
        res.status(500).json({ error: "The post could not be removed" })
    }
})

//Export the router for the server.js
module.exports = router;