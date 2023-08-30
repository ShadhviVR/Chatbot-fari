import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './chat.module.css';
import { fetchChat } from '../../../api/axios';

const API_BASE_URL = 'http://46.226.110.124:5000';

const ChatInterface = () => {
  const [conversationId, setConversationId] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatMessagesRef = useRef(null);
  const [data, setData] = useState(null);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
  const fetchChat = async () => {
        setData(data);
  };
  fetchChat();
});

  useEffect(() => {
    const initiateConversation = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/initiate`);
        setConversationId(response.data.conversation_id);
      } catch (error) {
        console.error('Error initiating conversation:', error);
      }
    };

    initiateConversation();
  }, []);

  const formatBotMessage = (botMessage) => {
    if (typeof botMessage !== 'string') {
      // If botMessage is not a string, return it directly
      return botMessage;
    }

    if (botMessage.startsWith('ul:')) {
      // Unordered list
      const listItems = botMessage.slice(3).split('|');
      return (
        <div>
          {listItems.map((item, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 'bold' }}>- </span>
              {item}
            </div>
          ))}
        </div>
      );
    } else if (botMessage.startsWith('ol:')) {
      // Ordered list
      const listItems = botMessage.slice(3).split('|');
      return (
        <div>
          {listItems.map((item, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 'bold' }}>{index + 1}. </span>
              {item}
            </div>
          ))}
        </div>
      );
    } else if (botMessage.startsWith('code:')) {
      // Code response
      const codeContent = botMessage.slice(5); // Remove the "code:" prefix
      return (
        <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
          <pre>
          <code>{codeContent}</code>
          </pre>
        </div>
      );
      }else {
      // Regular text response
      // Replace "\n" with <br> to force line breaks
      return botMessage.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: inputMessage },
    ]);
    setInputMessage('');

    try {
      setIsBotTyping(true);
      const response = await axios.post(`${API_BASE_URL}/chatbot`, {
        message: inputMessage,
        conversation_id: conversationId,
      });
      const renderUserMessage = (message) => {
        return (
          <div className={styles.userMessage} style={{ marginBottom: '10px', textAlign: 'right' }}>
            <span>You: </span>
            {message.content}
          </div>
        );
      };
    
      const renderBotMessage = (message) => {
        return (
          <div className={styles.botMessage} style={{ marginBottom: '10px', textAlign: 'left' }}>
            <span>Bot: </span>
            {formatBotMessage(message.content)}
          </div>
        );
      };
    
      const renderMessage = (message) => {
        return message.role === 'bot' ? renderBotMessage(message) : renderUserMessage(message);
      };

      const botMessage = response.data.message;
      setIsBotTyping(false);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'bot', content: formatBotMessage(botMessage) },
        ]);
      }, 500); // A short delay before showing the bot's response
    } catch (error) {
      setIsBotTyping(false);
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (conversationId) {
      console.log('Conversation ID:', conversationId);
    }
  }, [conversationId]);

  const handleScroll = () => {
    // Check if the user is at the bottom of the chat messages container
    const { scrollHeight, clientHeight, scrollTop } = chatMessagesRef.current;
    const isAtBottom = scrollHeight - scrollTop === clientHeight;

    // If the user is at the bottom, then allow automatic scrolling
    if (isAtBottom) {
      // Scroll to the bottom of the chat messages container
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/initiate`);
      setConversationId(response.data.conversation_id);
      setMessages([]);
    } catch (error) {
      console.error('Error initiating conversation:', error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat messages container after messages have been updated
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <button className={styles.refreshButton} onClick={handleRefresh}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M5 18c4.667 4.667 12 1.833 12-4.042h-3l5-6 5 6h-3c-1.125 7.98-11.594 11.104-16 4.042zm14-11.984c-4.667-4.667-12-1.834-12 4.041h3l-5 6-5-6h3c1.125-7.979 11.594-11.104 16-4.041z"/></svg>
        </button>
      </div>
      <div className={styles.chatMessages} ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === 'bot' ? styles.botMessage : styles.userMessage
            }
            style={{
              marginBottom: '10px',
              textAlign: message.role === 'bot' ? 'left' : 'right',
            }}
          >
            <span>{message.role === 'bot' ? 'Bot: ' : 'You: '}</span>
            {message.role === 'bot'
              ? formatBotMessage(message.content)
              : message.content}
          </div>
        ))}
        {isBotTyping && (
          <div className={styles.botMessage} style={{ marginBottom: '10px', textAlign: 'left' }}>
            <span>Bot: </span>
            <TypingAnimation />
          </div>
        )}
        <div ref={chatMessagesRef} />
      </div>
      
      <div className={styles.fixedInputContainer}>
        <input
          type="text"
          className={styles.userInput}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Add the event listener for "Enter" key press
          placeholder="Type your message..."
        />
        <button className={styles.sendButton} onClick={sendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.sendIcon}
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const TypingAnimation = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 5 ? '' : prevDots + '.'));
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span>Typing{dots}</span>;
};

export default ChatInterface;
