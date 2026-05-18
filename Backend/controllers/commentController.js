const commentService = require("../services/commentService");

const createComment = async(req,res) => {
    try {
        const comment = await commentService.createComment(req.body, req.user.id, req.params.postId);
        await comment.populate("user", "username");
        res.status(200).json({
            message: "comment added",
            comment
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateComment = async(req,res) => {
    try {
        const comment = await commentService.updateComment(req.body, req.user.id, req.params.commentId,  req.user.role);

        res.status(200).json({
            message: "comment updated",
            comment
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteComment = async(req,res) => {
    try {
        const comment = await commentService.deleteComment(req.user.id, req.params.commentId, req.user.role);

        res.status(200).json({
            message: "comment deleted"
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getComment = async(req,res) => {
    try {
        const comment = await commentService.getComment(req.params.postId);

        res.status(200).json({
            message: "View the comment of the post",
            comment
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {createComment, updateComment, deleteComment, getComment};