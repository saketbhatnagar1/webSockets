import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000'); // Assuming your backend is running on port 9000

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', ({ userId, message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { userId, message },
      ]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && userId.trim()) {
      socket.emit('user-message', { userId, message });
      setMessage(''); // Clear message input after sending
    } else if (!userId) {
      alert('Please enter a User ID!');
    }
  };

  return (
    <div className="App">
      <h1>ChatApp</h1>
      <div id="chat-container">
        <div id="messages">
          {messages.map((msg, index) => (
            <p key={index}>
              <span className="userid">[{msg.userId}]</span>: {msg.message}
            </p>
          ))}
        </div>
        <div id="input-container">
          <input
            type="text"
            id="userid"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="text"
            id="message"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button id="sendbutton" onClick={sendMessage}>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
