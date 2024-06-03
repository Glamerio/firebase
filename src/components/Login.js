import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const messagesRef = database.ref('messages');
        messagesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const messagesArray = [];
            for (let id in data) {
                messagesArray.push({ id, ...data[id] });
            }
            setMessages(messagesArray);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        const messagesRef = database.ref('messages');
        const newMessage = {
            text: message,
            user: auth.currentUser.email,
            timestamp: new Date().toISOString()
        };
        messagesRef.push(newMessage);
        setMessage('');
    };

    return (
        <div>
            <h2>Chat Room</h2>
            <ul>
                {messages.map(msg => (
                    <li key={msg.id}><strong>{msg.user}:</strong> {msg.text}</li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
