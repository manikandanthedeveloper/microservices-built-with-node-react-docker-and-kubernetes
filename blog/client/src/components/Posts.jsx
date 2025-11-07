import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { useEffect } from "react";
import { fetchPosts } from "../store/postSlice";

const Posts = () => {
	const { posts } = useSelector((state) => state.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);
	console.log("Posts from Redux Store:", posts);
	return (
		<div className="container">
			<div className="row">
				<h2 className="mb-4 mt-4">Posts</h2>
				<CreatePost />
				{posts && posts.length === 0 ? (
					<div className="col-md-8 mx-auto mb-4">
						<p className="text-center">No posts yet.</p>
					</div>
				) : (
					posts.map((post) => (
						<div key={post.id} className="col-md-8 mx-auto mb-4">
							<Post post={post} />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Posts;
