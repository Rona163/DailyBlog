import { useState } from "react";
import './RegisterPage.css';
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        username: "",
        email: "",
        password: ""

    });

    const handleChange =(e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await registerUser(formData);
            alert("Registered Successfully");
            navigate('/login');
        } catch(error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="registercontainer">
            <form onSubmit={handleSubmit} className="registerform">
                <h2>Create Account</h2>
                <input type="text" name="username" placeholder="UserName" value={formData.username} onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
};

export default RegisterPage;