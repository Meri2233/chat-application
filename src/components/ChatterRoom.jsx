import { useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "../firebase-config";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ChatterRoom() {
    let [rooms, addRooms] = useState([]);
    let user = useSelector(state => state.user.user[0]);

    async function addNewRoom(e) {
        let data = new FormData(e.target);
        let roomname = data.get('chatroom');
        let room = {
            admin: user.email,
            messages: {},
            name: roomname
        }
        await set(ref(database, 'rooms/' + roomname), room);
    }

    useEffect(() => {
        const roomsRef = ref(database, 'rooms/');
        onValue(roomsRef, (snapshot) => {
            const data = snapshot.val();
            let copy = rooms;
            for (let property in data) {
                copy.push(data[property]);
            }
            addRooms(copy);
        });
    }, [])

    return (
        <div className="chatterroom">
            <h3>Chatter Rooms</h3>
            <div className="rooms">
                <div className="chats">
                    {rooms.map((el, index) => <Link style={{ textDecoration: 'none' }} key={index} to={"/chat/:" + el.name}>
                        <div className="message">
                            <h4>{el.name}</h4>
                            <p>{el.admin}</p>
                        </div>
                    </Link>)}
                </div>
                <div className="add">
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        addNewRoom(event);
                    }}>
                        <input type="text" id="chatroom" name="chatroom" className="chatroom" />
                        <button className="button">Add</button>
                    </form>
                </div>
            </div>


        </div>
    )
}
export default ChatterRoom