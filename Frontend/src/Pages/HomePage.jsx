import homecover from "../assets/images/homecover.jpg";
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homecontainer">
            <img src={homecover} alt="homecover" className="homeimage"/>
            <div className="homecontent">
                <h1>Welcome to DailyBlog</h1>
                <h2>Platform to Express Yourself</h2>
            </div>
        </div>
    )
}
export default HomePage;