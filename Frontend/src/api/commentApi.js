import API from "./axios";

export const getMe = async () => {
    const res = await API.get("/auth/me");
    return res.data.user;
};

// get comments for a post
export const getComments = async (postId) => {
    const res = await API.get(`/comment/${postId}`);
    return res.data;
};

// add comment
export const addComment = async (postId, text) => {
    const res = await API.post(`/comment/${postId}`, 
        {text}
    );
    return res.data;
};

// delete comment
export const deleteComment = async (commentId) => {
    const res = await API.delete(`/comment/${commentId}`);
    return res.data;
};