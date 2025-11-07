const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const posts = []; // In-memory storage for posts with comments

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;

	if (type === "PostCreated") {
		const { id, title, content } = data;

		posts.push({ id, title, content, comments: [] });
	}

	if (type === "CommentCreated") {
		const { postId, id, content, status } = data;

		const post = posts.find((p) => p.id === postId);
		if (post) {
			post.comments.push({ id, content, status });
		}
	}

	if (type === "CommentUpdated") {
		const { postId, id, content, status } = data;

		const post = posts.find((p) => p.id === postId);
		if (post) {
			const comment = post.comments.find((c) => c.id === id);
			if (comment) {
				comment.status = status;
				comment.content = content;
			}
		}
	}

	res.send(posts);
});

app.listen(3002, () => {
	console.log("Query service is running on http://localhost:3002");
});
