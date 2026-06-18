import { useEffect, useState } from "react";
import { addComment, getComments, deleteComment, getMe } from "../api/commentApi";
import './CommentSection.css';

const CommentSection = ({ postId }) => {

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    // GET CURRENT USER
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getMe();
            setCurrentUser(user);
        };

        fetchUser();
    }, []);

    // FETCH COMMENTS
    useEffect(() => {

        const fetchComments = async () => {
            try {
                const data = await getComments(postId);

                //backend sends {comment: [...]}
                setComments(data.comment);

            } catch (error) {
                console.log(error);
            }
        };

        if (postId) {
            fetchComments();
        }

    }, [postId]);

    // ADD COMMENT
    const handleAddComment = async () => {
        try {

            if (!text.trim()) return;

            const data = await addComment(postId, text);

            setComments((prev) => [...prev, data.comment]);
            setText("");

        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {

            await deleteComment(commentId);

            setComments((prev) =>
                prev.filter((comment) => comment._id !== commentId)
            );

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="comment-box">

            <h4 className="comment-title">
                Comments
            </h4>

            <div className="comments-container">

                {Array.isArray(comments) &&
                    comments.map((c) => (
                        <div
                            key={c._id}
                            className="single-comment"
                        >

                            <div className="comment-header">

                                <span className="comment-username">
                                    {c.user?.username || "Unknown User"}
                                </span>

                                {currentUser?.id === c.user?._id && (
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDeleteComment(c._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                )}

                            </div>

                            <p className="comment-text">
                                {c.text}
                            </p>

                        </div>
                    ))
                }

            </div>

            <div className="comment-input-section">

                <input
                    className="comment-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                />

                <button
                    className="comment-btn"
                    onClick={handleAddComment}
                >
                    Add Comment
                </button>

            </div>

        </div>
    );
};

export default CommentSection;