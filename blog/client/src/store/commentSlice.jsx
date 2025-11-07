import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	comments: [],
};

export const createComment = createAsyncThunk(
	"post/createComment",
	async (newComment) => {
		const response = await axios.post(
			`http://localhost:3001/posts/${newComment.postId}/comments`,
			newComment
		);

		return response.data;
	}
);

const commentSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createComment.fulfilled, (state, action) => {
				return { ...state, comments: action.payload };
			})
			.addCase(createComment.rejected, (state, action) => {
				console.error("Failed:", action.error);
			});
	},
});

export default commentSlice.reducer;
