const express = require("express");
const postRouter = require("./data/posts-router");

const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);

//Endpoints

server.get("/", (req, res) => {
	res.status(200).send("Hello Daniel");
});

module.exports = server;
