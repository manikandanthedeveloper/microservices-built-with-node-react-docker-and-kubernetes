import Comments from "./Comments/Comments";

const Posts = () => {
    return (
        <div className="row">
            <h2 className="mb-4 mt-4">Posts</h2>
            <div className="col-md-8 mx-auto mb-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Sample Post Title</h5>
                        <p className="card-text">This is a sample post content.</p>
                        <Comments />
                    </div>
                </div>
            </div>
            <div className="col-md-8 mx-auto mb-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Sample Post Title</h5>
                        <p className="card-text">This is a sample post content.</p>
                        <Comments />
                    </div>
                </div>
            </div>
            <div className="col-md-8 mx-auto mb-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Sample Post Title</h5>
                        <p className="card-text">This is a sample post content.</p>
                        <Comments />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
