import { useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "../firebase-config";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRoom } from "../slice/roomSlice"

function ChatterRoom() {
    let dispatch = useDispatch();
    let rooms = useSelector(state => state.room.room)
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
        dispatch(addRoom(room));
    }

    useEffect(() => {
        const roomsRef = ref(database, 'rooms/');
        onValue(roomsRef, (snapshot) => {
            const data = snapshot.val();
            for (let property in data) {
                dispatch(addRoom(data[property]));
                //console.log(data[property])
            }
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