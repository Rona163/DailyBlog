import {Link, useLocation} from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
    const token = localStorage.getItem("accessToken");
    const location = useLocation();
    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        window.location.href="/login";
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="logo"> Techie Blog</Link>
            </div>

            <div className="nav-links">
                {
                    !token ? (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>) : (
                        <>
                            {location.pathname === "/dashboard" && (
                                <Link to="/" className="nav-link">Home</Link>
                            )}

                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/myprofile" className="nav-link">My Profile</Link>
                            <button onClick={handleLogOut} className="logout-button">Logout</button>
                        </>
                    )
                }
            </div>
        </nav>
    );

};

export default NavBar;