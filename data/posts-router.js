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

// Creating a comment for the post specifying the id (Post request)
router.post("/:id/comments", (req, res) => {
	const postId = req.params.id;
	const comment = { ...req.body, post_id: postId };

	Posts.findById(postId).then(found => {
		if (!found) {
			res
				.status(404)
				.json({ message: "The post with the specified ID does not exist." });
		} else {
			comment.text
				? Posts.insertComment(comment)
						.then(id => {
							res.status(201).json({ ...comment, ...id });
						})
						.catch(error => {
							console.log(error);
							res.status(500).json({
								message:
									"There was an error while saving the comment to the database"
							});
						})
				: res.status(400).json({
						message: "Please provide text for the comment."
				  });
		}
	});
});

// Getting the posts from the database (GET request)
router.get("/", (req, res) => {
	Posts.find(req.query)
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ message: "Error retrieving the posts" });
		});
});

// Getting a specific post by ID (GET request)
router.get("/:id", (req, res) => {
	id = req.params.id;

	Posts.findById(id)
		.then(post => {
			// console.log("Single Post", post);
			if (!post.length) {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist" });
			} else {
				res.status(200).json(post);
			}
		})
		.catch(error => {
			console.log(error);
			res
				.status(500)
				.json({ message: "The post information could not be retrieved." });
		});
});

// Getting all the comments for a specified post (GET request)
router.get("/:id/comments", (req, res) => {
	postId = req.params.id;

	Posts.findPostComments(postId)
		.then(comments => {
			if (!comments.length) {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			} else {
				res.status(200).json(comments);
			}
		})
		.catch(error => {
			console.log(error);
			res
				.status(500)
				.json({ message: "The comments information could not be retrieved." });
		});
});

module.exports = router;

// Deleting an specified post (DELETE request)
router.delete("/:id", (req, res) => {
	postId = req.params.id;

	Posts.remove(postId)
		.then(post => {
			if (!post) {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			} else {
				res.status(200).end();
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ message: "The post could not be removed." });
		});
});
