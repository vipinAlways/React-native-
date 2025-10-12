export interface User extends Document {
  username: string;
  email: string;
  password: string;
  tokens: [
    {
      token: string;
    }
  ];
  chat: Chat[];
}

export interface Message extends Document {
  senderID: string
  receiverId: string
  text: string
  timestamp: number
}


interface Chat {
  id: string
  messages: Message[]
}
