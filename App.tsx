
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { generateResponse } from './services/geminiService';
import { Contact, Message, Chat } from './types';

const initialContacts: Contact[] = [
  { id: '1', name: 'Alice', avatarUrl: 'https://picsum.photos/seed/alice/200' },
  { id: '2', name: 'Bob', avatarUrl: 'https://picsum.photos/seed/bob/200' },
  { id: '3', name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/charlie/200' },
  { id: '4', name: 'Diana', avatarUrl: 'https://picsum.photos/seed/diana/200' },
  { id: '5', name: 'Ethan', avatarUrl: 'https://picsum.photos/seed/ethan/200' },
];

const initialChats: Record<string, Chat> = {
  '1': { contactId: '1', messages: [{ id: 'msg1', text: "Hey! How's it going?", timestamp: new Date(Date.now() - 1000 * 60 * 5), sender: 'contact' }] },
  '2': { contactId: '2', messages: [{ id: 'msg2', text: 'Did you see the game last night?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), sender: 'contact' }] },
  '3': { contactId: '3', messages: [{ id: 'msg3', text: 'Lunch tomorrow?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), sender: 'contact' }] },
  '4': { contactId: '4', messages: [{ id: 'msg4', text: 'Project deadline is Friday!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), sender: 'contact' }] },
  '5': { contactId: '5', messages: [{ id: 'msg5', text: 'Happy Birthday! 🎉', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), sender: 'contact' }] },
};

const App: React.FC = () => {
  const [contacts] = useState<Contact[]>(initialContacts);
  const [chats, setChats] = useState<Record<string, Chat>>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>('1');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSelectChat = (contactId: string) => {
    setSelectedChatId(contactId);
  };

  const handleSendMessage = useCallback(async (text: string) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      timestamp: new Date(),
      sender: 'user',
      status: 'sent',
    };

    // Update UI immediately with user's message
    setChats(prevChats => {
      const updatedChat = { ...prevChats[selectedChatId] };
      updatedChat.messages = [...updatedChat.messages, newMessage];
      return { ...prevChats, [selectedChatId]: updatedChat };
    });

    setIsTyping(true);

    const contact = contacts.find(c => c.id === selectedChatId);
    if (!contact) {
      setIsTyping(false);
      return;
    }
    
    try {
      const responseText = await generateResponse(text, contact.name);

      const responseMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        text: responseText,
        timestamp: new Date(),
        sender: 'contact',
      };

      setChats(prevChats => {
        const updatedChat = { ...prevChats[selectedChatId] };
        updatedChat.messages = [...updatedChat.messages, responseMessage];
        return { ...prevChats, [selectedChatId]: updatedChat };
      });
    } catch (error) {
      console.error("Failed to get Gemini response:", error);
      const errorMessage: Message = {
        id: `msg-error-${Date.now()}`,
        text: "Sorry, I couldn't get a response. Please try again.",
        timestamp: new Date(),
        sender: 'contact',
      };
       setChats(prevChats => {
        const updatedChat = { ...prevChats[selectedChatId] };
        updatedChat.messages = [...updatedChat.messages, errorMessage];
        return { ...prevChats, [selectedChatId]: updatedChat };
      });
    } finally {
      setIsTyping(false);
    }
  }, [selectedChatId, contacts]);

  const selectedContact = contacts.find(c => c.id === selectedChatId);

  return (
    <div className="flex h-screen w-screen text-white antialiased overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[127px] bg-[#202c33] z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-[#111b21] z-0"></div>
      
      <div className="relative flex w-full h-full max-w-7xl mx-auto z-10 shadow-2xl">
        <div className={`w-full md:w-[30%] lg:w-[30%] xl:w-[30%] flex-shrink-0 bg-[#111b21] border-r border-gray-700 ${selectedChatId ? 'hidden md:flex' : 'flex'} flex-col`}>
          <Sidebar
            contacts={contacts}
            chats={chats}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
          />
        </div>
        <div className={`w-full md:w-[70%] lg:w-[70%] xl:w-[70%] flex flex-col ${selectedChatId ? 'flex' : 'hidden md:flex'}`}>
          {selectedContact ? (
            <ChatWindow
              contact={selectedContact}
              chat={chats[selectedChatId]}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              onBack={() => setSelectedChatId(null)}
            />
          ) : (
             <div className="flex flex-col items-center justify-center h-full bg-[#222e35]">
                <img src="https://picsum.photos/seed/whatsapp/400" alt="Placeholder" className="w-64 h-64 rounded-full mb-8 opacity-50"/>
                <h1 className="text-3xl font-light text-gray-300">Keep your phone connected</h1>
                <p className="text-gray-400 mt-2 text-center">Gemini Chat connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
