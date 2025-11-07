import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/postSlice";

const CreatePost = () => {
	const [formData, setFormData] = useState({
		title: "",
		content: "",
	});
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!isValid()) return;

		const newPost = {
			title: formData.title,
			content: formData.content,
		};

		try {
			dispatch(createPost(newPost));
		} catch (error) {
			console.error("Failed to create post:", error);
		}

		setFormData({
			title: "",
			content: "",
		});
	};

	const onChangeHandler = (e) => {
		const { name, value } = e.target;

		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const isValid = () => {
		const errorMessage = {};
		let valid = true;

		if (!formData.title.trim()) {
			errorMessage.title = "Please enter valid title";
			valid = false;
		} else if (!formData.content.trim()) {
			errorMessage.content = "Please enter valid content";
			valid = false;
		}

		setError(valid ? { title: "", content: "" } : errorMessage);
		return valid;
	};

	return (
		<div className="row">
			<form
				className="col-md-4 mx-auto mt-4 mb-4"
				onSubmit={(e) => handleSubmit(e)}
			>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						className={`form-control ${
							error && error.title ? "is-invalid" : ""
						}`}
						id="title"
						name="title"
						value={formData.title}
						onChange={onChangeHandler}
					/>
					{error && error.title && (
						<div className="invalid-feedback">{error.title}</div>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="content" className="form-label">
						Content
					</label>
					<textarea
						className={`form-control ${
							error && error.content ? "is-invalid" : ""
						}`}
						id="content"
						name="content"
						rows={3}
						value={formData.content}
						onChange={onChangeHandler}
					></textarea>
					{error && error.content && (
						<div className="invalid-feedback">{error.content}</div>
					)}
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
