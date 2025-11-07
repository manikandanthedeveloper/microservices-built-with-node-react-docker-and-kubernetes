const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const { v4: uniq } = require("uuid");
app.use(bodyParser.json());
app.use(cors());

// Mock data for blog posts
const posts = [
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab1",
		title: "First Post",
		content: "This is the first post.",
	},
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab2",
		title: "Second Post",
		content: "This is the second post.",
	},
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab3",
		title: "Third Post",
		content: "This is the third post.",
	},
];

// Route to get all blog posts
app.get("/posts", (req, res) => {
	res.json(posts);
});

app.get("/posts/:id", (req, res) => {
	const postId = req.params.id;
	const post = posts.find((p) => p.id === postId);
	if (post) {
		res.json(post);
	} else {
		res.status(404).json({ message: "Post not found" });
	}
});

app.post("/posts", async (req, res) => {
	const { title, content } = req.body;

	const newPost = {
		id: uniq(),
		title,
		content,
	};
	posts.push(newPost);
	try {
		await axios.post("http://localhost:3005/events", {
			type: "PostCreated",
			data: newPost,
		});
	} catch (err) {
		// Log the error but don't crash the posts service if the event bus is down
		console.error("Failed to send PostCreated event to event-bus:", err && err.message ? err.message : err);
	}
	res.status(201).json(newPost);
});

app.post("/events", (req, res) => {
	console.log("Received Event", req.body.type);

	res.send({});
});

app.listen(3000, () => {
	console.log("Blog post server is running on http://localhost:3000");
});
