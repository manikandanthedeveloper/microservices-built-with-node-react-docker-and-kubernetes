const FormPost = () => {
    return (
        <div className="row">
            <form className="col-md-4 mx-auto mt-4 mb-4">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" id="content" rows={3}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default FormPost;
