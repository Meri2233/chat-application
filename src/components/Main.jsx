import Body from "./Body"
import Header from "./Header"
import { Routes, Route, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase-config"
import { useState } from "react";
import { ref, set } from "firebase/database";
import { database } from "../firebase-config"
import ChatterRoom from "./ChatterRoom";
import Chatbox from "./Chatbox";

let provider = new GoogleAuthProvider();

function Main() {
    let navigate = useNavigate();
    let [user, setUser] = useState(null);

    async function writeUserData(name, email, imageUrl) {
        await set(ref(database, 'users/' + "_" + email.replace(/\./g)), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    }

    let loginWithGoogle = async () => {
        let userObj;
        await signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                userObj = {
                    name: user.displayName,
                    email: user.email,
                    profilePicture: user.photoURL
                }
                setUser(userObj);
                writeUserData(userObj.name, userObj.email, userObj.profilePicture)
                navigate("/chatterroom", { replace: true });

            }).catch((err) => {
                alert("ERROR OCCURED:", err.message);
            })
    }
    let logoutFromGoogle = () => {
        signOut(auth)
            .then(() => console.log("Signout Successful"))
            .catch((err) => alert("ERROR OCCURED:", err.message));
        setUser(null);
    }

    return (
        <div className="container">
            <Header user={user} Logout={logoutFromGoogle} />
            <Routes>
                <Route path="/" element={<Body user={user} googleLogin={loginWithGoogle} />} />
                <Route path="/chatterroom" element={<ChatterRoom user={user}/>} />
                <Route path="/chat/:id" element = {<Chatbox user={user}/>}/>
            </Routes>
        </div>
    )
}

export default Main