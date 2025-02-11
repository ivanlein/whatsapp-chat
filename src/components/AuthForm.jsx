import React, { useState } from 'react';

const AuthForm = ({ onAuth }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idInstance.trim() && apiTokenInstance.trim() && recipientPhone.trim()) {
      onAuth({ idInstance, apiTokenInstance, recipientPhone });
    }
  };

  return (
    <div className="auth-form">
      <h2>Введите данные GREEN-API</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="idInstance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Номер получателя (например, 79991234567)"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
          required
        />
        <button type="submit">Начать чат</button>
      </form>
    </div>
  );
};

export default AuthForm;