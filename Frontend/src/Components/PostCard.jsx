import { useState } from "react";
import { likePost } from "../api/postApi";
import CommentSection from "./CommentSection";

const PostCard = ({ post, onDelete, userRole }) => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    
    const [likes, setLikes] = useState(post.likes?.length || 0);
    const [liked, setLiked] = useState(
        post.likes?.includes(currentUser?.id)
    );
    const [showComments, setShowComments] = useState(false);

    const handleLike = async () => {
        try {
            const data = await likePost(post._id);
            // update state
            setLikes(data.like.likes);
            setLiked(data.like.liked);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="post-card">
            <p>{post.user.username}</p>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <div className="post-actions">
            <button onClick={handleLike}>
                {liked ? "💔 Unlike" : "❤️ Like"} ({likes})
            </button>

            <button onClick={() => setShowComments(!showComments)}>
                💬 Comment
            </button>
            {showComments && (
                <CommentSection postId={post._id} />
            )}

            {userRole === "admin" && (
            <button  onClick={() => onDelete(post._id)}>
                Delete
            </button>
            )}

            </div>
        </div>
    );
};

export default PostCard;