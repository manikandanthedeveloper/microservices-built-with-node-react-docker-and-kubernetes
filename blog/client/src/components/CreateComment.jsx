import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../store/commentSlice";
import { fetchPosts, addCommentToPost } from "../store/postSlice";

const CreateComments = ({ postid }) => {
	const [formData, setFormData] = useState({
		content: "",
	});
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isValid()) return;

		const newComment = {
			postId: postid,
			content: formData.content,
		};

		try {
			console.log("Submitting comment for post", postid, newComment);
			dispatch(createComment(newComment)).then((action) => {
				console.log("createComment action:", action);
				// If creation succeeded, optimistically update posts in the client store
				if (action.type && action.type.endsWith("/fulfilled")) {
					const createdComment = action.payload;
					dispatch(
						addCommentToPost({
							postId:
								createdComment.postId || createdComment.postId,
							comment: {
								id: createdComment.id,
								content: createdComment.content,
							},
						})
					);
					// Also refresh posts in the background to ensure final consistency
					dispatch(fetchPosts());
				} else {
					console.error("createComment failed:", action.error);
				}
			});
		} catch (error) {
			console.error("Failed to create post:", error);
		}

		setFormData({ content: "" });
	};

	const onChangeHandler = (e) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const isValid = () => {
		const errorMessage = {};
		let valid = true;

		if (!formData.content.trim()) {
			errorMessage.content = "Please enter valid comment";
			valid = false;
		}

		setError(valid ? { content: "" } : errorMessage);
		return valid;
	};
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<div className="mb-3">
				<label htmlFor="comment" className="form-label">
					Leave a comment
				</label>
				<textarea
					className={`form-control ${
						error.content ? "is-invalid" : ""
					}`}
					id="comment"
					rows={3}
					name="content"
					value={formData.content}
					onChange={onChangeHandler}
				></textarea>
				{error.content && (
					<div className="invalid-feedback">{error.content}</div>
				)}
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default CreateComments;
