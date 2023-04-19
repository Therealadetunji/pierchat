import React, { useEffect, useState } from 'react';
import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uudi } from 'uuid';
import './styles/message.css';

const APP_ID = '08330ab0224849d19cf980a51455e864';
const uid = uudi();
const CHANNEL_NAME = 'My new Project';
const client = AgoraRTM.createInstance(APP_ID);

const Message = () => {
  const [text, setText] = useState('');
  const [channel, setChannel] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connect = async () => {
      await client.login({ uid, token: null });
      const channel = await client.createChannel(CHANNEL_NAME);
      await channel.join();
      channel.on('ChannelMessage', (message, senderId) => {
        setMessages((prev) => [...prev, {
          uid: senderId,
          text: message.text,
        }]);
      });
      setChannel(channel);
    };
    const connection = connect();

    return () => {
      const logout = async () => {
        const channel = await connection;
        await client.logout();
        await channel.leave();
      };
      logout();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text === '') return;
    channel.sendMessage({
      text,
      type: 'text',
    });
    setMessages((prev) => [...prev, {
      uid,
      text,
    }]);
    setText('');
  };

  return (
    <div className="message">
      <div className="message__header">
        <h3>Message</h3>
      </div>
      <div className="inner__message">
        {messages.map((msg) => (
          <div key={msg.id} className="message__list">
            {msg.text}
          </div>
        ))}
      </div>

      <form
        className="message__form"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <button
          type="submit"
          // submit the message to the channel when user clicks on the send button
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Message;
