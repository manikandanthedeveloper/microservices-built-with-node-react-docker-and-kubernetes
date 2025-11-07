const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const { v4: uniq } = require("uuid");
app.use(bodyParser.json());
app.use(cors());

// Mock data for comments
const comments = [];

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
		status: "pending",
	};
	comments.push(newComment);
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

app.post("/events", async (req, res) => {
	const { type, data } = req.body;

	if (type === "CommentModerated") {
		const { id, postId, status, content } = data;
		const comment = comments.find((c) => c.id === id);

		if (comment) {
			comment.status = status;

			try {
				await axios.post("http://localhost:3005/events", {
					type: "CommentUpdated",
					data: {
						id,
						postId,
						status,
						content,
					},
				});
			} catch (error) {
				console.error(
					"Failed to send CommentUpdated event to event-bus:",
					error && error.message ? error.message : error
				);
			}
		}
	}

	res.send({});
});

app.listen(3001, () => {
	console.log("Comments server is running on http://localhost:3001");
});
