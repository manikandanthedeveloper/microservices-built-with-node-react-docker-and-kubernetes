import CommentForm from "./CommentForm";

const CommentList = () => {
    return (
        <>
            <ul className="list-group mb-4 ">
                <li className="list-group-item list-group-item-action list-group-item-light rounded-2">Great post!</li>
            </ul>
            <CommentForm />
        </>
    );
};

export default CommentList;
