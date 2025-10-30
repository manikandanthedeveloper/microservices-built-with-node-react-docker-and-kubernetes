const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { v4: uniq } = require("uuid");
app.use(bodyParser.json());

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

app.post("/posts", (req, res) => {
	const newPost = {
		id: uniq(),
		title: req.body.title,
		content: req.body.content,
	};
	posts.push(newPost);
	res.status(201).json(newPost);
});

app.listen(3000, () => {
	console.log("Blog post server is running on http://localhost:3000");
});
