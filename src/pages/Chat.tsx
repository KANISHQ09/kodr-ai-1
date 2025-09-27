import React, { useState } from 'react';
import axios from 'axios';

const Chat: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { text: userInput, sender: 'user' }]);
    const messageToSend = userInput;
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/agent', {
        message: messageToSend,
      });

      // Add agent response to chat
      setMessages((prev) => [
        ...prev,
        { text: response.data.response, sender: 'agent' },
      ]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Failed to get response from server.', sender: 'agent' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <div
        id="chatbox"
        style={{
          border: '1px solid #ccc',
          padding: 10,
          height: 300,
          overflowY: 'auto',
          marginBottom: 10,
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Agent'}:</strong>{' '}
            {msg.text}
          </div>
        ))}
        {loading && <div>Agent is typing...</div>}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 5 }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
