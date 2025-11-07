const Comment = ({ comment }) => {
	return (
		<li
			key={comment.id}
			className="list-group-item list-group-item-action list-group-item-light rounded-2 mb-2"
		>
			{comment.content}
		</li>
	);
};

export default Comment;
