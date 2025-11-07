import Comments from "./Comments";

const Post = ({ post }) => {
	return (
		<div className="card mb-3">
			<div className="card-body">
				<h5 className="card-title">{post.title}</h5>
				<p className="card-text">{post.content}</p>
				<Comments comments={post.comments} postid={post.id} />
			</div>
		</div>
	);
};

export default Post;
