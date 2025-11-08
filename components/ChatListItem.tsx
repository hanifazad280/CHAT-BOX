
import React from 'react';
import { Contact, Chat } from '../types';

interface ChatListItemProps {
  contact: Contact;
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const formatTimestamp = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }
    return date.toLocaleDateString();
};


export const ChatListItem: React.FC<ChatListItemProps> = ({ contact, chat, isSelected, onClick }) => {
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <div
      className={`flex items-center p-3 cursor-pointer hover:bg-[#202c33] transition-colors duration-150 ${isSelected ? 'bg-[#2a3942]' : ''}`}
      onClick={onClick}
    >
      <img src={contact.avatarUrl} alt={contact.name} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1 min-w-0 border-t border-gray-700 pt-3">
        <div className="flex justify-between items-center">
          <p className="text-lg text-white truncate">{contact.name}</p>
          <p className="text-xs text-gray-400">{lastMessage ? formatTimestamp(lastMessage.timestamp) : ''}</p>
        </div>
        <p className="text-sm text-gray-400 truncate">
          {lastMessage ? lastMessage.text : 'No messages yet'}
        </p>
      </div>
    </div>
  );
};
