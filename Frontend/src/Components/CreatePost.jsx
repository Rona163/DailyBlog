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
            const data = await createPost(formData);
            console.log(data);
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
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit} className="createpost">
                <input type="text" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange}/>
                <input type="text" name="content" placeholder="Write your content here" value={formData.content} onChange={handleChange}/>
                <button type="submit">Post</button>
            </form>
        </div>
    )
};

export default CreatePost;