import React, { useState, useEffect, useRef } from 'react';
import './ChatPanel.css';
import io from 'socket.io-client';

const ChatPanel = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const socket = useRef(null); // Create socket reference

  // Connect to the server
  useEffect(() => {
    socket.current = io(import.meta.env.REACT_APP_CHAT_API); // Connect to the backend server

    // Listen for incoming messages
    socket.current.on('receive_message', (message) => {
      setMessages((prevMessages) => {
        // Avoid adding the same message multiple times
        if (!prevMessages.some((msg) => msg.text === message.text)) {
          return [...prevMessages, message];
        }
        return prevMessages; // Don't add duplicate messages
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);


  // Send message handler
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = { sender: "user", text: newMessage };
    setMessages((prevMessages) => [...prevMessages, message]); // Update local state

    // Emit the message to the backend server
    socket.current.emit('send_message', message);

    setNewMessage(""); // Clear the input field
  };

  // Send message on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="chat-panel">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "receiver"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPanel;
