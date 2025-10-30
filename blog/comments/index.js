const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { v4: uniq } = require("uuid");
app.use(bodyParser.json());

// Mock data for comments
const comments = [
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab4",
		postId: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab1",
		content: "This is the first comment.",
	},
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab5",
		postId: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab1",
		content: "This is the second comment.",
	},
	{
		id: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab6",
		postId: "86e920e7-667e-4f8e-9b9d-c1d674ee8ab2",
		content: "This is the third comment.",
	},
];

app.get("/posts/:postId/comments", (req, res) => {
	const postId = req.params.postId;
	const postComments = comments.filter((c) => c.postId === postId);
	res.json(postComments);
});

app.post("/posts/:postId/comments", (req, res) => {
	const postId = req.params.postId;
	const newComment = {
		id: uniq(),
		postId: postId,
		content: req.body.content,
	};
	comments.push(newComment);
	res.status(201).json(newComment);
});

app.listen(3001, () => {
	console.log("Comments server is running on http://localhost:3001");
});
