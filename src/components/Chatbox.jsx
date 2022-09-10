import React from 'react'
import { useParams } from 'react-router-dom'
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase-config';
import { useState } from 'react';

export default function Chatbox({ user }) {
    let { id } = useParams();
    let [messages, addmessages] = useState([]);

    const messagesRef = ref(database, `rooms/${id}/messages`);
    onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        let copy = messages;
        for (let property in data) {
            copy.push(data[property]);
            console.log(data[property]);
        }
        addmessages(copy);
    });

    let addNewChatMessage = async () => {
        let data = new FormData(e.target);
        let messagedata = data.get('message');
        let message = {
            date: Date.now(),
            message: messagedata,
            sender: user.email
        }
        await set(ref(database, 'rooms/' + id + "/messages"), message);
    }
    
    return (
        <div>
            <div className="messages">
                {messages.map((el, index) => {
                    if (el.sender === user.email) {
                        <div class="owncontainer">
                            <p>{el.message}</p>
                            <span class="time-right">{el.date}</span>
                        </div>
                    }
                    else {
                        <div class="otherscontainer">
                            <p>{el.message}</p>
                            <span class="time-right">{el.date}</span>
                        </div>
                    }

                })}
            </div>
            <form onSubmit={(event) => {
                event.preventDefault();
                addNewChatMessage(event);
            }}>
                <input type="text" name='message' placeholder='Type your message here' />
                <button>Send</button>
            </form>

        </div>
    )
}
