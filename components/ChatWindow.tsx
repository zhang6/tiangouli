import React, { useEffect, useRef } from 'react';
import { ChatMessage, Sender } from '../types';
import { motion } from 'framer-motion';

interface ChatWindowProps {
  messages: ChatMessage[];
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-black/90 rounded-lg overflow-hidden border border-gray-700 h-28 flex flex-col shrink-0">
      <div className="bg-gray-800 px-2 py-0.5 text-[10px] text-gray-400 font-mono border-b border-gray-700 flex justify-between">
        <span>> SIMP_LOG.txt</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1">
        {messages.map((msg) => {
          const isGoddess = msg.sender === Sender.Goddess;
          const isSystem = msg.sender === Sender.System;
          
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                leading-tight
                ${isGoddess ? 'text-red-400 font-bold' : ''}
                ${msg.sender === Sender.LiZong ? 'text-green-400' : ''}
                ${isSystem ? 'text-yellow-500' : ''}
              `}
            >
              <span className="opacity-40 text-[10px]">[{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>{' '}
              {isGoddess ? '👸🏻: ' : (isSystem ? '⚠️: ' : '🐶: ')}
              {msg.text}
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};