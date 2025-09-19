
import React from 'react';
import ChatView from './components/ChatView';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-black flex flex-col font-sans antialiased max-w-2xl mx-auto">
      <Header />
      <ChatView />
    </div>
  );
};

export default App;
