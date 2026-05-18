import { useState } from "react";
import './LoginPage.css';
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            const data = await loginUser(formData);
            console.log(data);

            localStorage.setItem(
                "accessToken",
                data.accessToken
            );

            localStorage.setItem(
                "refreshToken",
                data.refreshToken
            );
            alert("Login Successfull");
            navigate('/dashboard');
        } catch(error) {
            console.log(error);
            alert(error.response.data.message);
        }

    };

    return ( 
        <div className="logincontainer">
            <form className="loginform" onSubmit={handleSubmit}>
                <h2>Login into your account</h2>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                <button type="submit">LogIn</button>
            </form>
        </div>
    )
};

export default LoginPage;