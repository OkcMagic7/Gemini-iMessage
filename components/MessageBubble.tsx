
import React from 'react';
import { Message, Sender } from '../types';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;

  const bubbleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  
  // To prevent animation on every stream update for the same message
  if (!message.text && message.sender === Sender.Bot) {
    return null;
  }

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`px-4 py-2.5 rounded-3xl max-w-xs md:max-w-md break-words ${
          isUser
            ? 'bg-gray-800 text-white rounded-br-lg'
            : 'bg-zinc-700 text-white rounded-bl-lg'
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
