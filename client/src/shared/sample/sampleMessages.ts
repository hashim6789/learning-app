type Sender = {
  _id: string;
  name: string;
  profilePicture: string;
};
interface Message {
  id: string;
  sender: Sender;
  message: string;
  createdAt: string;
}

export const sampleMessages: Message[] = [
  {
    id: "1",
    sender: {
      _id: "John Doe",
      name: "John Doe",
      profilePicture: "photo",
    },
    message: "Hello everyone!",
    createdAt: "10:30 AM",
  },
  {
    id: "2",
    sender: {
      _id: "Alice",
      name: "JAlice",
      profilePicture: "photo",
    },
    message: "Hey! How’s it going?",
    createdAt: "10:32 AM",
  },
  {
    id: "3",
    sender: {
      _id: "John Doe",
      name: "John Doe",
      profilePicture: "photo",
    },
    message: "I'm doing well, thanks! What about you?",
    createdAt: "10:33 AM",
  },
  {
    id: "4",
    sender: {
      _id: "Alice",
      name: "Alice",
      profilePicture: "photo",
    },
    message: "All good here. Just started working on a new project.",
    createdAt: "10:35 AM",
  },
  {
    id: "5",
    sender: {
      _id: "Alice",
      name: "Alice",
      profilePicture: "photo",
    },
    message: "Hey folks, what are we chatting about?",
    createdAt: "10:40 AM",
  },
  {
    id: "6",
    sender: {
      _id: "Alice",
      name: "John Doe",
      profilePicture: "photo",
    },
    message: "Hey Mark, we're just catching up. How’s it going?",
    createdAt: "10:42 AM",
  },
  {
    id: "7",
    sender: {
      _id: "Alice",
      name: "John Doe",
      profilePicture: "photo",
    },
    message: "Good morning everyone! Excited to join the chat.",
    createdAt: "10:45 AM",
  },
];
