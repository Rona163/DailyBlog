import { useEffect, useState } from "react";
import { getMyPosts, deletePost, updatePost } from "../api/postApi";
import './MyProfilePage.css';

const MyProfilePage = () => {

    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const data = await getMyPosts();
                setPosts(data.post);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMyPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);

            setPosts((prev) =>
                prev.filter((post) => post._id !== postId)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = (post) => {
        setEditingPostId(post._id);
        setEditTitle(post.title);
        setEditContent(post.content);
    };

    const handleUpdatePost = async (postId) => {
        try {
        const updatedPost = await updatePost(postId, {
            title: editTitle,
            content: editContent
        });

        setPosts((prev) => prev.map((post) => post._id === postId? updatedPost.post : post)
        );

        setEditingPostId(null);

    } catch (error) {
        console.log(error);
    }
    };

    return (
            <div>
        <h2>My Profile</h2>

        {posts.length === 0 ? (

            <p className="no-posts">
                No posts yet
            </p>

        ) : (

            posts.map((post) => (
                <div key={post._id} className="post-card">

                    {editingPostId === post._id? (

                        <>
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />

                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />

                            <button onClick={() => handleUpdatePost(post._id)}>
                                Save
                            </button>

                            <button onClick={() => setEditingPostId(null)}>
                                Cancel
                            </button>
                        </>

                    ) : (

                        <>
                            <h3>{post.title}</h3>

                            <p>{post.content}</p>

                            <button onClick={() => handleEditClick(post)}>
                                Edit
                            </button>

                            <button onClick={() => handleDelete(post._id)}>
                                Delete
                            </button>
                        </>
                    )}

                </div>
            ))
        )}
    </div>
    );
};

export default MyProfilePage;