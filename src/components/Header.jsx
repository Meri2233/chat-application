import {  Link } from "react-router-dom";

function Header({ Logout, user }) {
    return (
        <div className="header">
            <h4>ChatterBox</h4>
            <div className="status">
                {user !== null ? <div className="loggedin"><img className="userimage" src={user.profilePicture} alt="userimage" />Hi, {user.name}<button className="logout" onClick={() => Logout()}>Logout</button></div> : <Link to="/chatterroom"> <button className="login">Login</button></Link>}
            </div>
        </div>
    )
}

export default Header