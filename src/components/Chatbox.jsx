import React from 'react'
import { useParams } from 'react-router-dom'
import { ref, set, onValue } from 'firebase/database';
import { database } from '../firebase-config';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../slice/messageSlice';

export default function Chatbox() {
    let { id } = useParams();
    let dispatch = useDispatch();
    let user = useSelector(state => state.user.user[0]);
    let messages = useSelector(state => state.message.message);
    console.log(messages)
    console.log(id.substring);

    useEffect(() => {
        const messagesRef = ref(database, `rooms/${id.substring(1)}/messages`);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            for (let property in data) {
                dispatch(addMessage(data[property]));
                console.log(data[property]);
            }
        });
    }, []);

    let addNewChatMessage = async (e) => {
        let data = new FormData(e.target);
        let messagedata = data.get('message');
        let message = {
            date: Date.now(),
            message: messagedata,
            sender: user.email
        }
        await set(ref(database, 'rooms/' + id.substring(1) + "/messages/" + Date.now()), message);
        dispatch(addMessage(message));
    }

    return (
        <div className='chatterroom'>
            <div className="rooms">
                <div className="messages">
                    {messages.map((el, index) => {
                        if (el.sender === user.email) {
                            return <div className="owncontainer">
                                <p>{el.message}</p>
                                <span class="time-right">Send At: {el.date}</span>
                            </div>
                        }
                        else {
                            return <div className="otherscontainer">
                                <p>{el.message}</p>
                                <span class="time-right">Send At: {el.date}</span>
                            </div>
                        }

                    })}
                </div>
                <div className="add">
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        addNewChatMessage(event);
                    }}>
                        <input type="text" name='message' className='chatroom' placeholder='Type your message here' />
                        <button className='button'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
