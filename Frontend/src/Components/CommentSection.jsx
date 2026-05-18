import { useEffect, useState } from "react";
import { addComment, getComments, deleteComment, getMe } from "../api/commentApi";

const CommentSection = ({ postId }) => {

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    // GET CURRENT USER
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getMe();
            console.log("CURRENT USER:", user);
            setCurrentUser(user);
        };

        fetchUser();
    }, []);

    // FETCH COMMENTS
    useEffect(() => {

        const fetchComments = async () => {
            try {
                const data = await getComments(postId);

                console.log("COMMENTS API RESPONSE:", data);

                // IMPORTANT: backend sends { comment: [...] }
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

            console.log("NEW COMMENT RESPONSE:", data);

            setComments((prev) => [...prev, data.comment]);
            setText("");

        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {

            console.log("DELETE COMMENT ID:", commentId);

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

            <h4>Comments</h4>

            {Array.isArray(comments) &&
                comments.map((c) => {

                    console.log("COMMENT OBJECT:", c);
                    console.log("COMMENT USER ID:", c.user?._id);
                    console.log("CURRENT USER ID:", currentUser?._id);

                    return (
                        <div key={c._id} className="single-comment">

                            <b>{c.user?.username || "Unknown User"}</b>
                            <p>{c.text}</p>

                            {/* DELETE BUTTON DEBUG CHECK */}
                            {currentUser?.id && c.user?._id === currentUser?.id && (
                                <button onClick={() => handleDeleteComment(c._id)}>
                                    Delete
                                </button>
                            )}

                        </div>
                    );
                })
            }

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
            />

            <button onClick={handleAddComment}>
                Add Comment
            </button>

        </div>
    );
};

export default CommentSection;