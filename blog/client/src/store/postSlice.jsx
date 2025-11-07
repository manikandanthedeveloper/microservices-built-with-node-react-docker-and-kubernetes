import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	posts: [],
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get("http://localhost:3002/posts");
	return response.data;
});

export const createPost = createAsyncThunk(
	"posts/createPost",
	async (newPost) => {
		const response = await axios.post(
			"http://localhost:3000/posts",
			newPost
		);
		return response.data;
	}
);

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		// Optimistically add a comment to a post in the client store
		addCommentToPost(state, action) {
			const { postId, comment } = action.payload;
			const post = state.posts.find((p) => p.id === postId);
			if (post) {
				post.comments = post.comments || [];
				post.comments.push(comment);
				// Debug: log optimistic update
				try {
					console.log(
						`addCommentToPost: added comment ${comment.id} to post ${postId}`
					);
				} catch (e) {
					console.error("Error logging addCommentToPost:", e);
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.fulfilled, (state, action) => {
				return { ...state, posts: action.payload };
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				console.error("Failed to fetch posts:", action.error);
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.posts.push(action.payload);
			})
			.addCase(createPost.rejected, (state, action) => {
				console.error("Failed to create post:", action.error);
			});
	},
});

export const { addCommentToPost } = postSlice.actions;

export default postSlice.reducer;
