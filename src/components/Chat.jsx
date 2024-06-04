import React, { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { database } from "../firebase";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = ref(database, "users/" + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUsername(data.username);
      });
    }

    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList = data ? Object.values(data) : [];
      setMessages(messagesList);
    });
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      text: message,
      username: username,
      timestamp: Date.now(),
    });
    setMessage("");
  };

  return (
    <div id="chatBackground">
      <div id="chat_container">
        <div id="chat_box">
          {messages.map((msg, index) => (
            <div className="messageBox" key={index}>
              <strong className="username">{msg.username}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div id="send_box">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="button send_button" onClick={handleSendMessage}>
          ➜
          </button>
        </div>
      </div>

    </div>
  );
};

export default Chat;
