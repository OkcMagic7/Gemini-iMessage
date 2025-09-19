
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="bg-black p-4 border-t border-zinc-800">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message"
          className="flex-1 bg-zinc-800 text-white placeholder-zinc-500 rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-shadow duration-200"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center disabled:bg-zinc-700 disabled:cursor-not-allowed"
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 text-white transition-opacity ${
              !text.trim() || isLoading ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;
