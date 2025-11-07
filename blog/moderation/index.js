const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json());

// In-memory storage for posts and comments
const posts = {};
const commentsByPostId = {};

// Handle incoming events
app.post("/events", async (req, res) => {
	const { type, data } = req.body;

	if (type === "CommentCreated") {
		const { id, content, postId } = data;

		// Store comment by postId
		const comments = commentsByPostId[postId] || [];
		const status = content.includes("orange") ? "rejected" : "approved";

		comments.push({ id, content, status });
		commentsByPostId[postId] = comments;

		// Update the corresponding post with the new comment
		const post = posts[postId] || { id: postId, comments: [] };
		post.comments.push({ id, content, status });
		posts[postId] = post;
		try {
			await axios.post("http://localhost:3005/events", {
				type: "CommentModerated",
				data: { id, content, postId, status },
			});
		} catch (error) {
			console.error("Error sending event:", error);
		}
	}

	res.send({});
});

// Endpoint to get all posts with their comments
app.get("/posts", (req, res) => {
	res.send(Object.values(posts));
});

app.listen(3003, () => {
	console.log("Moderation service is running on http://localhost:3003");
});
