const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

const createComment = async(data, userId, postId) => {
    const {text} = data;
    if(!text) {
        throw new Error("Comment should not be blank");
    }
    const post = await Post.findById(postId);
    if(!post) {
        throw new Error("Post not found");
    }

    const comment = await Comment.create({
        text,
        user: userId,
        post: postId
    });
    return comment;
};

const updateComment = async(data, userId, commentId, userRole) => {
    const {text} = data;
    const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
    
        if (comment.user.toString() !== userId && userRole !== "admin") {
            throw new Error("Not authorized to update the comment");
        }

    if (text) {
        comment.text = text;
    }
    const updatedComment = await comment.save();
    return updatedComment;
};

const deleteComment = async(userId, commentId, userRole) => {
    const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
    
        if (comment.user.toString() !== userId && userRole !== "admin") {
            throw new Error("Not authorized to delete the comment");
        }
    
        const deletedComment = await comment.deleteOne();
    
        return {message: "Comment deleted Sucessfully"};
};

const getComment = async(postId) => {
    const comments = await Comment.find({ post: postId })
        .populate("user", "username _id")
        .sort({ createdAt: -1 });

    return comments;
};

module.exports = {createComment, updateComment, deleteComment, getComment};