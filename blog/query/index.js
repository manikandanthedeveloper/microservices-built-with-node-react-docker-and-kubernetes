const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

const posts = []; // In-memory storage for posts with comments

const handleEvent = (type, data) => {
	if (type === "PostCreated") {
		const { id, title, content } = data;
		posts.push({ id, title, content, comments: [] });
	} else if (type === "CommentCreated") {
		const { id, postId, content, status } = data;
		const post = posts.find((p) => p.id === postId);
		if (post) {
			post.comments.push({ id, content, status });
		}
	} else if (type === "CommentUpdated") {
		const { id, postId, content, status } = data;
		const post = posts.find((p) => p.id === postId);
		if (post) {
			const comment = post.comments.find((c) => c.id === id);
			if (comment) {
				comment.status = status;
				comment.content = content;
			}
		}
	}

	// if (type === "PostCreated") {
	// 	const { id, title, content } = data;

	// 	posts.push({ id, title, content, comments: [] });
	// }

	// if (type === "CommentCreated") {
	// 	const { postId, id, content, status } = data;

	// 	const post = posts.find((p) => p.id === postId);
	// 	if (post) {
	// 		post.comments.push({ id, content, status });
	// 	}
	// }

	// if (type === "CommentUpdated") {
	// 	const { postId, id, content, status } = data;

	// 	const post = posts.find((p) => p.id === postId);
	// 	if (post) {
	// 		const comment = post.comments.find((c) => c.id === id);
	// 		if (comment) {
	// 			comment.status = status;
	// 			comment.content = content;
	// 		}
	// 	}
	// }
};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;

	handleEvent(type, data);

	res.send(posts);
});

app.listen(3002, async () => {
	console.log("Query service is running on http://localhost:3002");

	try {
		const res = await axios.get("http://localhost:3005/events");
		for (let event of res.data) {
			console.log("Processing event:", event.type);
			handleEvent(event.type, event.data);
		}
	} catch (error) {
		console.error("Error fetching events:", error);
	}
});
