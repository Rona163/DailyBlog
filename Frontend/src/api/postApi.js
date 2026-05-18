import API from "./axios";

export const createPost = async(postData) => {
    const response = await API.post(
        "/post/",
        postData
    );
    return response.data;
};

export const updatePost = async(postId, updatedData) => {
    const response = await API.put(`/post/${postId}`, updatedData);
    return response.data;
};

export const deletePost = async(postId) => {
    const response = await API.delete(`/post/${postId}`);
    return response.data;
};

export const getAllPosts = async() => {
    const response = await API.get(
        "/post"
    );
    return response.data;
};

// like post
export const likePost = async (postId) => {
    const response = await API.put(`/post/like/${postId}`);
    return response.data;
};

// comment post (future backend)
export const commentPost = async (postId, data) => {
    const response = await API.post(`/post/${postId}/comment`, data);
    return response.data;
};

export const getMyPosts = async (postId) => {
    const response = await API.get(`/post/${postId}`);
    return response.data;
};