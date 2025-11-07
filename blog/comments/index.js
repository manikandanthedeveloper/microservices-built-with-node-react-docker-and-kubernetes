const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const { v4: uniq } = require("uuid");
app.use(bodyParser.json());
app.use(cors());

// Mock data for comments
const comments = [
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab4",
		postId: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab1",
		content: "This is the first comment.",
	},
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab5",
		postId: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab2",
		content: "This is the second comment.",
	},
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab6",
		postId: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab3",
		content: "This is the third comment.",
	},
];

app.get("/posts/:postId/comments", (req, res) => {
	const postId = req.params.postId;
	const postComments = comments.filter((c) => c.postId === postId);
	res.json(postComments);
});

app.post("/posts/:postId/comments", async (req, res) => {
	const newComment = {
		id: uniq(),
		postId: req.params.postId,
		content: req.body.content,
	};

	try {
		await axios.post("http://localhost:3005/events", {
			type: "CommentCreated",
			data: newComment,
		});
	} catch (error) {
		// Log the error but don't crash the posts service if the event bus is down
		console.error(
			"Failed to send CommentCreated event to event-bus:",
			error && error.message ? error.message : error
		);
	}

	res.status(201).json(newComment);
});

app.post("/events", (req, res) => {
	console.log("Received Event", req.body.type);

	res.send({});
});

app.listen(3001, () => {
	console.log("Comments server is running on http://localhost:3001");
});
