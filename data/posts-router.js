const express = require("express");
const Posts = require("./db");

const router = express.Router();

router.post("/", (req, res) => {
	Posts.insert(req.body)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ message: "Error adding the post" });
		});
});

module.exports = router;
