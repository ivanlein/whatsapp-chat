import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import InputBox from './InputBox';

const Chat = ({ idInstance, apiTokenInstance, senderPhone, recipientPhone }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    if (!text.trim()) {
      console.error('Текст сообщения отсутствует');
      return;
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
    const payload = {
      chatId: `${recipientPhone}@c.us`,
      message: text,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Сообщение отправлено:', {
        from: senderPhone,
        to: recipientPhone,
        text: text,
        response: response.data,
      });

      setMessages([...messages, { text, isMyMessage: true }]);
    } catch (error) {
      console.error('Ошибка отправки сообщения:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
  };

  const receiveMessages = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url);
      console.log('Ответ от API:', response.data);

      if (response.data) {
        const notification = response.data.body;

        if (
          notification.typeWebhook === 'incomingMessageReceived' &&
          notification.messageData.typeMessage === 'textMessage'
        ) {
          const messageData = notification.messageData.textMessageData;
          const sender = notification.senderData.sender;

          if (sender === `${recipientPhone}@c.us`) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: messageData.textMessage, isMyMessage: false },
            ]);
          }
        }

        const receiptId = response.data.receiptId;
        if (receiptId) {
          await axios.delete(
            `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
          );
          console.log('Уведомление удалено:', receiptId);
        }
      } else {
        console.log('Нет новых уведомлений');
      }
    } catch (error) {
      console.error('Ошибка получения сообщения:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessages, 5000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} isMyMessage={msg.isMyMessage} />
        ))}
      </div>
      <InputBox onSendMessage={sendMessage} />
    </div>
  );
};

export default Chat;