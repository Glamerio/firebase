import React, { useState, useEffect } from "react";
import { ref, push, onValue, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { database } from "../firebase";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [newChannelName, setNewChannelName] = useState("");

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

    const channelsRef = ref(database, "channels");
    onValue(channelsRef, (snapshot) => {
      const data = snapshot.val();
      const channelsList = data ? Object.entries(data) : [];
      setChannels(channelsList);
      if (channelsList.length > 0 && !selectedChannel) {
        setSelectedChannel(channelsList[0][0]);
      }
    });
  }, [selectedChannel]);

  useEffect(() => {
    if (selectedChannel) {
      const messagesRef = ref(database, `channels/${selectedChannel}/messages`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messagesList = data ? Object.values(data) : [];
        setMessages(messagesList);
      });
    }
  }, [selectedChannel]);

  const handleSendMessage = () => {
    if (message.trim() === "" || !selectedChannel) return;

    const messagesRef = ref(database, `channels/${selectedChannel}/messages`);
    push(messagesRef, {
      text: message,
      username: username,
      timestamp: Date.now(),
    });
    setMessage("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSendMessage();
  };

  const handleCreateChannel = () => {
    const channelsRef = ref(database, "channels");
    const newChannelRef = push(channelsRef, { name: newChannelName });
    setNewChannelName("");
    setSelectedChannel(newChannelRef.key);
  };

  const handleDeleteChannel = (channelId) => {
    const channelRef = ref(database, `channels/${channelId}`);
    remove(channelRef);
    if (selectedChannel === channelId) {
      setSelectedChannel(null);
    }
  };
  return (
    <div id="chat">
      <div id="article">
        <div className="chat_channels">
          <h3>Channels</h3>
          <div className="chat_channels_box">
            <ul>
              {channels.map(([channelId, channel]) => (

                <li key={channelId} onClick={() => setSelectedChannel(channelId)}>
                  <span className="channel_name">{channel.name}</span> <button className="delete_button" onClick={() => handleDeleteChannel(channelId)}><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M11 16h2v-4.15l1.6 1.55L16 12l-4-4l-4 4l1.4 1.4l1.6-1.55zm-4 5q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM7 6v13z" /></svg></button>
                </li>
              ))}
            </ul>
            <div className="new_channel_container">
              <input
                className="new_channel_name"
                type="text"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                placeholder="New Channel Name"
              />
              <button className="send_button" onClick={handleCreateChannel}><svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="M12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z" /><path fill="currentColor" fill-rule="evenodd" d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0" clip-rule="evenodd" /></svg></button>
            </div>

          </div>
        </div>
      </div>
      <div id="chatBackground">
        <form onSubmit={handleFormSubmit}>
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
                placeholder="Send a message !!"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="button send_button" type="submit">
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
