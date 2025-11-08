
import React from 'react';
import { ChatList } from './ChatList';
import { MenuIcon } from './icons/MenuIcon';
import { NewChatIcon } from './icons/NewChatIcon';
import { StatusIcon } from './icons/StatusIcon';
import { SearchIcon } from './icons/SearchIcon';
import { Contact, Chat } from '../types';

interface SidebarProps {
  contacts: Contact[];
  chats: Record<string, Chat>;
  onSelectChat: (contactId: string) => void;
  selectedChatId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ contacts, chats, onSelectChat, selectedChatId }) => {
  return (
    <div className="flex flex-col h-full bg-[#111b21]">
      <header className="flex items-center justify-between p-3 bg-[#202c33] flex-shrink-0">
        <img src="https://picsum.photos/seed/myuser/40" alt="My Avatar" className="w-10 h-10 rounded-full" />
        <div className="flex items-center space-x-4 text-gray-400">
          <button className="p-2 hover:bg-gray-700 rounded-full"><StatusIcon /></button>
          <button className="p-2 hover:bg-gray-700 rounded-full"><NewChatIcon /></button>
          <button className="p-2 hover:bg-gray-700 rounded-full"><MenuIcon /></button>
        </div>
      </header>
      <div className="p-2 bg-[#111b21] flex-shrink-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-[#202c33] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none text-gray-200"
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <ChatList
          contacts={contacts}
          chats={chats}
          onSelectChat={onSelectChat}
          selectedChatId={selectedChatId}
        />
      </div>
    </div>
  );
};
