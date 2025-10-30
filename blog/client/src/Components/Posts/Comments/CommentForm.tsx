const CommentForm = () => {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="comment" className="form-label">Leave a comment</label>
                <textarea className="form-control" id="comment" rows={3}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default CommentForm;
