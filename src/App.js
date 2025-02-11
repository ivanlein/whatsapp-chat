import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  const [authData, setAuthData] = useState(null);

  const handleAuth = (data) => {
    setAuthData(data);
  };

  return (
    <div className="app">
      <h1>WhatsApp Chat</h1>
      {!authData ? (
        <AuthForm onAuth={handleAuth} />
      ) : (
        <Chat
          idInstance={authData.idInstance}
          apiTokenInstance={authData.apiTokenInstance}
          recipientPhone={authData.recipientPhone}
        />
      )}
    </div>
  );
};

export default App;