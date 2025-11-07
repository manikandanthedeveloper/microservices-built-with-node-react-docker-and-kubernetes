import Comment from "./Comment";
import CreateComments from "./CreateComment";

const Comments = ({ comments: initialComments, postid }) => {
	// Render directly from props to avoid local-state staleness
	const comments = initialComments || [];

	return (
		<>
			<ul className="list-group mb-4 ">
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</ul>
			<CreateComments postid={postid} />
		</>
	);
};

export default Comments;
