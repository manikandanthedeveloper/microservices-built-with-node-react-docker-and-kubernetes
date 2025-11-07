const Comment = ({ comment }) => {
	// Render the comment content
	let content = comment.content;

	if (comment.status === "pending") {
		content = "This comment is awaiting moderation";
	} else if (comment.status === "rejected") {
		content = "This comment has been rejected";
	}

	return (
		<li
			key={comment.id}
			className="list-group-item list-group-item-action list-group-item-light rounded-2 mb-2"
		>
			{content}
		</li>
	);
};

export default Comment;
