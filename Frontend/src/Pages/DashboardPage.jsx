import { useEffect, useState } from "react";
import { getAllPosts } from "../api/postApi";
import CreatePost from '../Components/CreatePost';
import './DashboardPage.css';
import PostCard from "../Components/PostCard";

const DashboardPage = () => {
    const fetchPosts = async() => {
        try {
            const data = await getAllPosts();
            console.log(data);
            setPost(data.post);
        } catch(error) {
            console.log(error);
        }
    };

    const [post, setPost] = useState([]);
    useEffect(() => {
        fetchPosts();
    },[]);

    const [showModal, setShowModal] = useState(false);

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
                    <PostCard key={post._id} post={post} />
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

        </div>
    );

};

export default DashboardPage;
