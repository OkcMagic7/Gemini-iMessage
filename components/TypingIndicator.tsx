
import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
  const dotVariants = {
    bouncing: {
      y: [0, -4, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-end justify-start"
    >
      <div className="px-4 py-3 bg-zinc-700 rounded-3xl rounded-bl-lg">
        <div className="flex space-x-1.5">
          <motion.span
            className="w-2 h-2 bg-zinc-400 rounded-full"
            variants={dotVariants}
            animate="bouncing"
            style={{ transitionDelay: '0s' }}
          />
          <motion.span
            className="w-2 h-2 bg-zinc-400 rounded-full"
            variants={dotVariants}
            animate="bouncing"
            style={{ transitionDelay: '0.1s' }}
          />
          <motion.span
            className="w-2 h-2 bg-zinc-400 rounded-full"
            variants={dotVariants}
            animate="bouncing"
            style={{ transitionDelay: '0.2s' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
