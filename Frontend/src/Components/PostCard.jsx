import { useState } from "react";
import { likePost } from "../api/postApi";
import CommentSection from "./CommentSection";

const PostCard = ({ post }) => {

    const [likes, setLikes] = useState(post.likes || 0);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleLike = async () => {
        try {
            const data = await likePost(post._id);
            console.log("Like:",data);

            // update state
            setLikes(data.like.likes);
            setLiked(data.like.liked);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="post-card">
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

            </div>
        </div>
    );
};

export default PostCard;