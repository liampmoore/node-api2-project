//Import express
const express = require('express');

//Import the router to use as middleware
const postsRouter = require('../posts/posts-router');

//Create the server object
const server = express();

//Use json middleware to automatically convert jsons
server.use(express.json());

//This is the response without any routes
server.get('/', (req, res) => {
  res.send(`
    <h2>Blog Post API</h>
    <p>Welcome to my blog post API.</p>
  `);
});

// This router middleware handles endpoints that begin with /api/posts
server.use('/api/posts', postsRouter)

module.exports = server;