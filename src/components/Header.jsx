import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header({ Logout }) {
    let user = useSelector(state => state.user.user);
    return (
        <div className="header">
            <h4>ChatterBox</h4>
            <div className="status">
                {user.length !== 0 ? <div className="loggedin"><img className="userimage" src={user[0].profilePicture} alt="" />Hi, {user[0].name}<button className="logout" onClick={() => Logout()}>Logout</button></div> : <Link to="/chatterroom"> <button className="login">Login</button></Link>}
            </div>
        </div>
    )
}

export default Header