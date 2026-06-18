import { useState } from "react";
import { createPost } from "../api/postApi";
import "./CreatePost.css";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await createPost(formData);
            alert("Post Created");
            setFormData({
                title: "",
                content: "",
            });
        }catch(error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="create-post-page">

            <div className="create-post-card">

                <h2>Create Post</h2>

                <form onSubmit={handleSubmit} className="createpost">

                    <input type="text" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange}/>

                    <textarea name="content" placeholder="Write your content here..." value={formData.content} onChange={handleChange} rows="6"/>

                    <button type="submit">Post</button>

                </form>

            </div>

        </div>
    )
};

export default CreatePost;