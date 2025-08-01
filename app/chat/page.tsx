import ChatPage from "@/components/ChatPage";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Conversation, Message } from "@/types/types";

// Dummy Conversations
const conversations: Conversation[] = [
  {
    id: "convo1",
    userId: "user2",
    listingId: "1",
    newMessageCount: 3,
    createdAt: new Date("2025-07-27T09:00:00Z"),
    updatedAt: new Date("2025-07-27T09:00:00Z"),
    lastMessage: "Hi, I saw your listing in Bole. Is it available?",
    user: {
      id: "user2",
      email: "alice@example.com",
      name: "Alice Johnson",
      password: "hashed",
      isAdmin: false,
      avatar: "https://i.pravatar.cc/40?u=1",
    },
  },
  {
    id: "convo2",
    userId: "user3",
    listingId: "2",
    newMessageCount: 0,
    createdAt: new Date("2025-07-27T09:05:00Z"),
    updatedAt: new Date("2025-07-27T09:05:00Z"),
    lastMessage: "Hi, I saw your listing in Bole. Is it available?",
    user: {
      id: "user3",
      email: "bob@example.com",
      name: "Bob Williams",
      password: "hashed",
      isAdmin: false,
      avatar: "https://i.pravatar.cc/40?u=2",
    },
  },
  {
    id: "convo3",
    userId: "user4",
    listingId: "3",
    newMessageCount: 1,
    createdAt: new Date("2025-07-27T09:10:00Z"),
    updatedAt: new Date("2025-07-27T09:10:00Z"),
    lastMessage: "Hi, I saw your listing in Bole. Is it available?",
    user: {
      id: "user4",
      email: "chris@example.com",
      name: "Chris Evans",
      password: "hashed",
      isAdmin: false,
      avatar: "https://i.pravatar.cc/40?u=3",
    },
  },
  {
    id: "convo4",
    userId: "user5",
    listingId: "4",
    newMessageCount: 4,
    createdAt: new Date("2025-07-27T09:15:00Z"),
    updatedAt: new Date("2025-07-27T09:15:00Z"),
    lastMessage: "Hi, I saw your listing in Bole. Is it available?",
    user: {
      id: "user5",
      email: "dana@example.com",
      name: "Dana White",
      password: "hashed",
      isAdmin: false,
      avatar: "https://i.pravatar.cc/40?u=4",
    },
  },
  {
    id: "convo5",
    userId: "user6",
    listingId: "5",
    newMessageCount: 0,
    createdAt: new Date("2025-07-27T09:20:00Z"),
    updatedAt: new Date("2025-07-27T09:20:00Z"),
    lastMessage: "Hi, I saw your listing in Bole. Is it available?",
    user: {
      id: "user6",
      email: "emily@example.com",
      name: "Emily Stone",
      password: "hashed",
      isAdmin: false,
      avatar: "https://i.pravatar.cc/40?u=5",
    },
  },
];

// Dummy Message
const messages: Message[] = [
  // convo1
  {
    id: "msg1",
    conversationId: "convo1",
    senderId: "user2",
    text: "Hi, I saw your listing in Bole. Is it available?",
    createdAt: new Date(),
  },
  {
    id: "msg2",
    conversationId: "convo1",
    senderId: "user1",
    text: "Yes, it’s still available. Would you like to visit?",
    createdAt: new Date(),
  },
  {
    id: "msg3",
    conversationId: "convo1",
    senderId: "user2",
    text: "Yes, please. Can we meet tomorrow morning?",
    createdAt: new Date(),
  },
  {
    id: "msg4",
    conversationId: "convo1",
    senderId: "user1",
    text: "Sure! I’ll be there at 10 AM.",
    createdAt: new Date(),
  },
  {
    id: "msg5",
    conversationId: "convo1",
    senderId: "user2",
    text: "Great, see you then!",
    createdAt: new Date(),
  },
  {
    id: "msg6",
    conversationId: "convo1",
    senderId: "user1",
    text: "See you!",
    createdAt: new Date(),
  },

  // convo2
  {
    id: "msg7",
    conversationId: "convo2",
    senderId: "user3",
    text: "Hi, is the Toyota Corolla still for sale?",
    createdAt: new Date(),
  },
  {
    id: "msg8",
    conversationId: "convo2",
    senderId: "user1",
    text: "Yes! It’s a 2021 model and in great condition.",
    createdAt: new Date(),
  },
  {
    id: "msg9",
    conversationId: "convo2",
    senderId: "user3",
    text: "Can I come check it this weekend?",
    createdAt: new Date(),
  },
  {
    id: "msg10",
    conversationId: "convo2",
    senderId: "user1",
    text: "Absolutely. Saturday works?",
    createdAt: new Date(),
  },
  {
    id: "msg11",
    conversationId: "convo2",
    senderId: "user3",
    text: "Yes. Morning would be best.",
    createdAt: new Date(),
  },
  {
    id: "msg12",
    conversationId: "convo2",
    senderId: "user1",
    text: "Cool, I’ll send the location.",
    createdAt: new Date(),
  },

  // convo3
  {
    id: "msg13",
    conversationId: "convo3",
    senderId: "user4",
    text: "Hi, the land you posted, is it negotiable?",
    createdAt: new Date(),
  },
  {
    id: "msg14",
    conversationId: "convo3",
    senderId: "user1",
    text: "It depends. What’s your offer?",
    createdAt: new Date(),
  },
  {
    id: "msg15",
    conversationId: "convo3",
    senderId: "user4",
    text: "Around 950k ETB?",
    createdAt: new Date(),
  },
  {
    id: "msg16",
    conversationId: "convo3",
    senderId: "user1",
    text: "Hmm, let me ask the owner.",
    createdAt: new Date(),
  },
  {
    id: "msg17",
    conversationId: "convo3",
    senderId: "user1",
    text: "Okay, he said 980k is the lowest.",
    createdAt: new Date(),
  },
  {
    id: "msg18",
    conversationId: "convo3",
    senderId: "user4",
    text: "Alright, I’ll think about it.",
    createdAt: new Date(),
  },

  // convo4
  {
    id: "msg19",
    conversationId: "convo4",
    senderId: "user5",
    text: "Hello! Is the warehouse near Mexico Square?",
    createdAt: new Date(),
  },
  {
    id: "msg20",
    conversationId: "convo4",
    senderId: "user1",
    text: "Yes, just a 5-minute walk away.",
    createdAt: new Date(),
  },
  {
    id: "msg21",
    conversationId: "convo4",
    senderId: "user5",
    text: "Sounds good. Can you share interior photos?",
    createdAt: new Date(),
  },
  {
    id: "msg22",
    conversationId: "convo4",
    senderId: "user1",
    text: "Sure, sending now...",
    createdAt: new Date(),
  },
  {
    id: "msg23",
    conversationId: "convo4",
    senderId: "user5",
    text: "Got it. Looks nice!",
    createdAt: new Date(),
  },
  {
    id: "msg24",
    conversationId: "convo4",
    senderId: "user1",
    text: "Thanks, happy to show it anytime.",
    createdAt: new Date(),
  },

  // convo5
  {
    id: "msg25",
    conversationId: "convo5",
    senderId: "user6",
    text: "Is this house family-friendly?",
    createdAt: new Date(),
  },
  {
    id: "msg26",
    conversationId: "convo5",
    senderId: "user1",
    text: "Very! Quiet neighborhood, close to schools.",
    createdAt: new Date(),
  },
  {
    id: "msg27",
    conversationId: "convo5",
    senderId: "user6",
    text: "That’s exactly what I’m looking for.",
    createdAt: new Date(),
  },
  {
    id: "msg28",
    conversationId: "convo5",
    senderId: "user1",
    text: "Let me know if you want a tour.",
    createdAt: new Date(),
  },
  {
    id: "msg29",
    conversationId: "convo5",
    senderId: "user6",
    text: "Yes, this Friday please.",
    createdAt: new Date(),
  },
  {
    id: "msg30",
    conversationId: "convo5",
    senderId: "user1",
    text: "Booked. Looking forward to it!",
    createdAt: new Date(),
  },
];

async function page() {
  if (messages && conversations)
    return <ChatPage messages={messages} conversations={conversations} />;
  else
    return (
      <Card className="overflow-hidden border border-border bg-background shadow-sm p-0">
        <CardContent className="flex flex-wrap gap-2 overflow-hidden p-1">
          <Skeleton className="w-full h-screen rounded text-center pt-5">
            Inbox
          </Skeleton>
          <Skeleton className="w-full h-screen rounded text-center pt-5">
            Conversation
          </Skeleton>
          <Skeleton className="w-full h-screen rounded text-center pt-5">
            Property
          </Skeleton>
        </CardContent>
      </Card>
    );
}

export default page;
