import {Link} from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("accessToken");
    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        window.location.href="/login";
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="logo"> Daily Blog </Link>
            </div>

            <div className="nav-links">
                {
                    !token ? (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>) : (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/myprofile" className="nav-link">{ currentUser.username || "My Profile"}</Link>
                            <button onClick={handleLogOut} className="logout-button">Logout</button>
                        </>
                    )
                }
            </div>
        </nav>
    );

};

export default NavBar;