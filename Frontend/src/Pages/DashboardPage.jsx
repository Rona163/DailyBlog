import { useEffect, useState } from "react";
import { getAllPosts } from "../api/postApi";
import CreatePost from '../Components/CreatePost';
import './DashboardPage.css';
import PostCard from "../Components/PostCard";
import { deletePost } from "../api/postApi";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal"

const DashboardPage = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const fetchPosts = async() => {
        try {
            const data = await getAllPosts();
            setPost(data.post);
        } catch(error) {
            console.log(error);
        }
    };

    const [post, setPost] = useState([]);
    useEffect(() => {
        fetchPosts();
    },[]);

    const handleDeleteClick = (postId) => {
        setPostToDelete(postId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deletePost(postToDelete);

            setPost((prev) =>
                prev.filter((p) => p._id !== postToDelete)
            );

            setShowDeleteModal(false);
            setPostToDelete(null);
        } catch (error) {
            console.log(error);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    return (
        <div className="dashboard-container">

            {/* TOP BAR */}
            <div className="top-bar">
                <button
                    className="create-post-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Create Post
                </button>
            </div>

            {/* POSTS */}
            <div className="posts-container">
                {post.map((post) => (
                    <PostCard key={post._id} post={post} onDelete={handleDeleteClick} userRole={currentUser?.role} />

                ))}

            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button
                            className="close-btn"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        <CreatePost />
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <ConfirmDeleteModal
                    onConfirm={confirmDelete}
                    onCancel={() => {
                        setShowDeleteModal(false);
                        setPostToDelete(null);
                    }}
                />
            )}

        </div>
    );

};

export default DashboardPage;
