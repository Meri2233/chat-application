import Body from "./Body"
import Header from "./Header"
import { Routes, Route, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase-config"
import { ref, set } from "firebase/database";
import { database } from "../firebase-config"
import ChatterRoom from "./ChatterRoom";
import Chatbox from "./Chatbox";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice"

let provider = new GoogleAuthProvider();

function Main() {
    let navigate = useNavigate();
    let dispatch = useDispatch()

    async function writeUserData(name, email) {
        let path = email.replace(/\./g,"");
        console.log(path);
        await set(ref(database, 'users/' + path), {
            username: name,
            email: email
        })
    }

    let loginWithGoogle = async () => {
        let userObj;
        await signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                userObj = {
                    name: user.displayName,
                    email: user.email,
                    //profilePicture: user.photoURL
                }
                writeUserData(userObj.name, userObj.email)
                dispatch(addUser(userObj));
                navigate("/chatterroom", { replace: true });

            }).catch((err) => {
                alert("ERROR OCCURED:", err.message);
            })
    }
    let logoutFromGoogle = () => {
        signOut(auth)
            .then(() => console.log("Signout Successful"))
            .catch((err) => alert("ERROR OCCURED:", err.message));
    }

    return (
        <div className="container">
            <Header Logout={logoutFromGoogle} />
            <Routes>
                <Route path="/" element={<Body googleLogin={loginWithGoogle} />} />
                <Route path="/chatterroom" element={<ChatterRoom />} />
                <Route path="/chat/:id" element={<Chatbox />} />
            </Routes>
        </div>
    )
}

export default Main