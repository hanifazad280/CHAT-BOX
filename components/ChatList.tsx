
import React from 'react';
import { ChatListItem } from './ChatListItem';
import { Contact, Chat } from '../types';

interface ChatListProps {
  contacts: Contact[];
  chats: Record<string, Chat>;
  onSelectChat: (contactId: string) => void;
  selectedChatId: string | null;
}

export const ChatList: React.FC<ChatListProps> = ({ contacts, chats, onSelectChat, selectedChatId }) => {
  const sortedChatContactIds = Object.keys(chats).sort((a, b) => {
    const lastMessageA = chats[a].messages[chats[a].messages.length - 1];
    const lastMessageB = chats[b].messages[chats[b].messages.length - 1];
    if (!lastMessageA) return 1;
    if (!lastMessageB) return -1;
    return lastMessageB.timestamp.getTime() - lastMessageA.timestamp.getTime();
  });

  return (
    <div>
      {sortedChatContactIds.map(contactId => {
        const contact = contacts.find(c => c.id === contactId);
        const chat = chats[contactId];
        if (!contact || !chat) return null;
        
        return (
          <ChatListItem
            key={contact.id}
            contact={contact}
            chat={chat}
            isSelected={selectedChatId === contact.id}
            onClick={() => onSelectChat(contact.id)}
          />
        );
      })}
    </div>
  );
};
