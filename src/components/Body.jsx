import { Link } from "react-router-dom"
import ChatterRoom from "./ChatterRoom"

function Body(props) {
    return (
        <div className="body">
             <div className="googlelogin">
                <h3>ChatterBox</h3>
                <button  className="google" onClick={(e) => props.googleLogin()}>Login with Google</button>
            </div>

        </div>
    )
}
export default Body