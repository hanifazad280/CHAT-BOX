
import React, { useState, useRef, useEffect } from 'react';
import { Contact, Chat } from '../types';
import { MessageBubble } from './MessageBubble';
import { MenuIcon } from './icons/MenuIcon';
import { SearchIcon } from './icons/SearchIcon';
import { AttachIcon } from './icons/AttachIcon';
import { EmojiIcon } from './icons/EmojiIcon';
import { MicIcon } from './icons/MicIcon';
import { SendIcon } from './icons/SendIcon';
import { VideoCallIcon } from './icons/VideoCallIcon';
import { PhoneCallIcon } from './icons/PhoneCallIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface ChatWindowProps {
  contact: Contact;
  chat: Chat;
  onSendMessage: (text: string) => void;
  isTyping: boolean;
  onBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, chat, onSendMessage, isTyping, onBack }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages, isTyping]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0b141a]" style={{ backgroundImage: "url('https://picsum.photos/seed/bg/1200/800?blur=1&grayscale')", backgroundBlendMode: "multiply", backgroundColor: "rgba(11, 20, 26, 0.95)"}}>
      <header className="flex items-center justify-between p-3 bg-[#202c33] flex-shrink-0">
        <div className="flex items-center">
          <button onClick={onBack} className="md:hidden mr-2 p-2 hover:bg-gray-700 rounded-full"><ArrowLeftIcon /></button>
          <img src={contact.avatarUrl} alt={contact.name} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-medium text-white">{contact.name}</h2>
            {isTyping && <p className="text-sm text-[#00a884]">typing...</p>}
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <button className="p-2 hover:bg-gray-700 rounded-full"><VideoCallIcon /></button>
          <button className="p-2 hover:bg-gray-700 rounded-full"><PhoneCallIcon /></button>
          <button className="p-2 hover:bg-gray-700 rounded-full"><SearchIcon /></button>
          <button className="p-2 hover:bg-gray-700 rounded-full"><MenuIcon /></button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-col space-y-2">
          {chat?.messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-3 bg-[#202c33] flex items-center flex-shrink-0">
        <button className="p-2 text-gray-400 hover:text-gray-200"><EmojiIcon /></button>
        <button className="p-2 text-gray-400 hover:text-gray-200"><AttachIcon /></button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="flex-1 bg-[#2a3942] rounded-lg py-2 px-4 mx-2 focus:outline-none text-gray-200"
        />
        <button onClick={handleSend} className="bg-[#00a884] w-12 h-12 flex items-center justify-center rounded-full text-white">
          {inputText ? <SendIcon /> : <MicIcon />}
        </button>
      </footer>
    </div>
  );
};
