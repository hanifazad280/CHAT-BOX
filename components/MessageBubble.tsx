
import React from 'react';
import { Message } from '../types';
import { DoubleCheckIcon } from './icons/DoubleCheckIcon';

interface MessageBubbleProps {
  message: Message;
}

const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md lg:max-w-2xl px-3 py-2 rounded-lg relative ${isUser ? 'bg-[#005c4b]' : 'bg-[#202c33]'}`}>
        <p className="text-white text-base mr-12">{message.text}</p>
        <div className="absolute bottom-1 right-2 flex items-center space-x-1">
          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
          {isUser && <DoubleCheckIcon read={message.status === 'read'} />}
        </div>
      </div>
    </div>
  );
};
