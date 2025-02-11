import React from 'react';

const Message = ({ text, isMyMessage }) => {
  return (
    <div className={`message ${isMyMessage ? 'my-message' : 'other-message'}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;