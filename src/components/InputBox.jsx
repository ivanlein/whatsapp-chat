import React, { useState } from 'react';

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="input-box">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение..."
      />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
};

export default InputBox;