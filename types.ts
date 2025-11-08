
export interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'contact';
  status?: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  contactId: string;
  messages: Message[];
}
