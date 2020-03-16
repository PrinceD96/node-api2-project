const express = require("express");
const Posts = require("./db");

const router = express.Router();

// Creating a post (POST request)
router.post("/", (req, res) => {
	const post = req.body;

	if (!post.title || !post.contents) {
		res.status(400).json({
			message: `Please provide ${
				!post.title ? "tittle" : "contents"
			} for the post.`
		});
	} else {
		Posts.insert(post)
			.then(id => {
				res.status(201).json({ ...id, ...post });
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({
					message: "There was an error while saving the post to the database"
				});
			});
	}
});

module.exports = router;
