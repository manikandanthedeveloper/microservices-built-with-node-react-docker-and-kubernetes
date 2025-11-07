const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const posts = []; // In-memory store for posts and their comments

app.get("/posts", (req, res) => {
	// Return aggregated data from posts and comments services
	res.send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;

	if (type === "PostCreated") {
		const { id, title, content } = data;

		posts.push({ id, title, content, comments: [] });
	}

	if (type === "CommentCreated") {
		const { postId, id, content } = data;

		const post = posts.find((p) => p.id === postId);
		if (post) {
			post.comments.push({ id, content });
		}
	}

	console.log("Updated Posts:", posts);

	res.send(posts);
});

app.listen(3002, () => {
	console.log("Query service is running on http://localhost:3002");
});
