const { post } = require("../routes/postRoute");
const postServices = require("../services/postService");

const createPost = async(req,res) => {
    try{
        const result = await postServices.createPost(req.body, req.user.id);

        res.status(201).json({
            message: "Posted Successfully",
            post: result
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }

};

const updatePost = async(req,res) => {
    try{
        const result = await postServices.updatePost(req.body,req.user.id, req.params.id, req.user.role);

        res.status(201).json({
            message: "Updated Successfully",
            post: result
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deletePost = async(req,res) => {
    try{
        const result = await postServices.deletePost(req.user.id, req.params.id, req.user.role);
        res.status(201).json({
            message: "deleted Successfully"
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getAllPost = async(req,res) => {
    try {
        //To pick the limit and page number from the query and display
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const post = await postServices.getAllPost(page, limit);
        res.status(200).json({
           post
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getUserPost = async(req,res) => {
    try {
        //To pick the limit and page number from the query and display
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const post = await postServices.getUserPost(page, limit, req.user.id);
        res.status(200).json({
           post
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const toggleLike = async(req,res) => {
    try {
        const like = await postServices.toggleLike(req.user.id, req.params.id);

        res.status(200).json({
            message: "Like/Unlike",
            like
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {createPost, updatePost, deletePost, getAllPost, getUserPost, toggleLike};