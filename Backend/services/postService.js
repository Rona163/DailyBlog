const { compare } = require("bcrypt");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async(data, userId) => {
    const {title, content} = data;
    if (!title || !content) {
        throw new Error("All fields are required");
    }

    const user = await User.findById(userId);
    const post = await Post.create({
        title,
        content,
        user: userId
    });
    
    return { post, username: user.username};
};

const updatePost = async(data, userId, postId,  userRole) => {
    const {title, content} = data;
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post not found");
    }

    //When roles are done, this option should not be shown on other's posts
    if (post.user.toString() != userId && userRole !== "admin") {
        throw new Error("Not authorized to update the post");
    }

    if (title) {
        post.title = title;
    }
    if(content) {
        post.content = content;
    }

    const updatedPost = await post.save();
    return updatedPost;

};

const deletePost = async(userId, postId, userRole) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }

    if (post.user.toString() != userId && userRole !== "admin") {
        throw new Error("Not authorized to delete the post");
    } 

     await post.deleteOne();

    return {message: "Post deleted Sucessfully"};
};

const getAllPost= async (page, limit) => {
    const posts = await Post.find()
        .populate("user", "username")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return posts;
};

const getUserPost = async (page, limit, userId) => {
    const posts = await Post.find({user: userId})
        .populate("user", "username")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return posts;
};

const toggleLike = async(userId, postId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
        post.likes = post.likes.filter(
            (id) => id.toString() !== userId
        );
    } else {
        post.likes.push(userId);
    }

    await post.save();

    return {
        message: alreadyLiked ? "Unliked post" : "Liked post",
        likes: post.likes.length,
        liked: !alreadyLiked
    };

};


module.exports = {createPost, updatePost, deletePost, getAllPost, getUserPost, toggleLike};