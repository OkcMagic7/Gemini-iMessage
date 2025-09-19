
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-zinc-900/50 backdrop-blur-md sticky top-0 border-b border-zinc-800 p-4">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-white font-semibold text-lg">Gemini</span>
          <span className="text-xs text-zinc-400">online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
