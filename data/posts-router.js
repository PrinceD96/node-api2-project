const express = require("express");
const Posts = require("./db");

const router = express.Router();

router.get("/", (req, res) => {
	console.log("Posts");
});

module.exports = router;
