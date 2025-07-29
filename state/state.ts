import { create } from "zustand";
import { Listing, Ads } from "@/types/types";
import ad1 from "@/app/assets/images/ad1.jpg";
import ad2 from "@/app/assets/images/ad2.jpg";
import ad3 from "@/app/assets/images/ad3.jpg";
import ad4 from "@/app/assets/images/ad4.jpg";
import img1 from "@/app/assets/images/image1.png";
import img2 from "@/app/assets/images/image3.png";
import img3 from "@/app/assets/images/image4.png";
import { Bath, BedDouble, DollarSign } from "lucide-react";

// Dummy Listings
const dummyListings: Listing[] = [
  {
    id: "1",
    title: "Modern House in Addis Ababa",
    location: "Bole",
    price: 3500000,
    image: img1.src,
    type: ["sale"],
    details: [
      { label: "Price", value: "3,500,000 ETB", icon: DollarSign },
      { label: "Bedrooms", value: 4, icon: BedDouble },
      { label: "Bathrooms", value: 3, icon: Bath },
    ],
  },
  {
    id: "2",
    title: "Toyota Vitz 2015",
    location: "Kazanchis",
    price: 1200000,
    image: img2.src,
    type: ["rent"],
    details: [{ label: "Price", value: "1,200,000 ETB", icon: DollarSign }],
  },
  {
    id: "3",
    title: "Luxury Apartment at Sarbet",
    location: "Sarbet",
    price: 7500000,
    image: img3.src,
    type: ["sale", "rent"],
    details: [
      { label: "Price", value: "3,500,000 ETB", icon: DollarSign },
      { label: "Bedrooms", value: 4, icon: BedDouble },
      { label: "Bathrooms", value: 3, icon: Bath },
    ],
  },
  {
    id: "4",
    title: "Modern House in Addis Ababa",
    location: "Bole",
    price: 3500000,
    image: img1.src,
    type: ["sale"],
    details: [
      { label: "Price", value: "3,500,000 ETB", icon: DollarSign },
      { label: "Bedrooms", value: 4, icon: BedDouble },
      { label: "Bathrooms", value: 3, icon: Bath },
    ],
  },
  {
    id: "5",
    title: "Toyota Vitz 2015",
    location: "Kazanchis",
    price: 1200000,
    image: img2.src,
    type: ["rent"],
    details: [{ label: "Price", value: "1,200,000 ETB", icon: DollarSign }],
  },
  {
    id: "6",
    title: "Luxury Apartment at Sarbet",
    location: "Sarbet",
    price: 7500000,
    image: img3.src,
    type: ["sale", "rent"],
    details: [
      { label: "Price", value: "3,500,000 ETB", icon: DollarSign },
      { label: "Bedrooms", value: 4, icon: BedDouble },
      { label: "Bathrooms", value: 3, icon: Bath },
    ],
  },
];

// Dummy Ads
const dummyAds: Ads[] = [
  {
    id: 1,
    src: ad1,
    title: "🔥 HOT DEAL",
    description: "Explore 50% discounts on premium listings",
    note: "Sponsored",
    link: "https://a2z-market.com/deal1",
    cta: "Shop Now",
  },
  {
    id: 2,
    src: ad2,
    title: "🏡 New Listing",
    description: "Modern apartments available now in Addis Ababa",
    note: "Verified",
    link: "https://a2z-market.com/listing/new",
    cta: "View Listing",
  },
  {
    id: 3,
    src: ad3,
    title: "📢 Broker Ads",
    description: "List your property for free today!",
    note: "Ad",
    link: "https://a2z-market.com/post",
    cta: "Get Started",
  },
  {
    id: 4,
    src: ad4,
    title: "🏡 New Listing",
    description: "Modern apartments available now in Addis Ababa",
    note: "Verified",
    link: "https://a2z-market.com/listing/new",
    cta: "View Listing",
  },
];

// // Dummy Conversations
// const conversations: Conversation[] = [
//   {
//     id: "convo1",
//     userId: "user2",
//     listingId: "listing1",
//     newMessageCount: 3,
//     createdAt: new Date("2025-07-27T09:00:00Z"),
//     user: {
//       id: "user2",
//       email: "alice@example.com",
//       name: "Alice Johnson",
//       password: "hashed",
//       isAdmin: false,
//       avatar: "https://i.pravatar.cc/40?u=1",
//     },
//   },
//   {
//     id: "convo2",
//     userId: "user3",
//     listingId: "listing2",
//     newMessageCount: 0,
//     createdAt: new Date("2025-07-27T09:05:00Z"),
//     user: {
//       id: "user3",
//       email: "bob@example.com",
//       name: "Bob Williams",
//       password: "hashed",
//       isAdmin: false,
//       avatar: "https://i.pravatar.cc/40?u=2",
//     },
//   },
//   {
//     id: "convo3",
//     userId: "user4",
//     listingId: "listing3",
//     newMessageCount: 1,
//     createdAt: new Date("2025-07-27T09:10:00Z"),
//     user: {
//       id: "user4",
//       email: "chris@example.com",
//       name: "Chris Evans",
//       password: "hashed",
//       isAdmin: false,
//       avatar: "https://i.pravatar.cc/40?u=3",
//     },
//   },
//   {
//     id: "convo4",
//     userId: "user5",
//     listingId: "listing4",
//     newMessageCount: 4,
//     createdAt: new Date("2025-07-27T09:15:00Z"),
//     user: {
//       id: "user5",
//       email: "dana@example.com",
//       name: "Dana White",
//       password: "hashed",
//       isAdmin: false,
//       avatar: "https://i.pravatar.cc/40?u=4",
//     },
//   },
//   {
//     id: "convo5",
//     userId: "user6",
//     listingId: "listing5",
//     newMessageCount: 0,
//     createdAt: new Date("2025-07-27T09:20:00Z"),
//     user: {
//       id: "user6",
//       email: "emily@example.com",
//       name: "Emily Stone",
//       password: "hashed",
//       isAdmin: false,
//       avatar: "https://i.pravatar.cc/40?u=5",
//     },
//   },
// ];

// // Dummy Message
// const messages: Message[] = [
//   // convo1
//   {
//     id: "msg1",
//     conversationId: "convo1",
//     senderId: "user2",
//     text: "Hi, I saw your listing in Bole. Is it available?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg2",
//     conversationId: "convo1",
//     senderId: "user1",
//     text: "Yes, it’s still available. Would you like to visit?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg3",
//     conversationId: "convo1",
//     senderId: "user2",
//     text: "Yes, please. Can we meet tomorrow morning?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg4",
//     conversationId: "convo1",
//     senderId: "user1",
//     text: "Sure! I’ll be there at 10 AM.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg5",
//     conversationId: "convo1",
//     senderId: "user2",
//     text: "Great, see you then!",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg6",
//     conversationId: "convo1",
//     senderId: "user1",
//     text: "See you!",
//     createdAt: new Date(),
//   },

//   // convo2
//   {
//     id: "msg7",
//     conversationId: "convo2",
//     senderId: "user3",
//     text: "Hi, is the Toyota Corolla still for sale?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg8",
//     conversationId: "convo2",
//     senderId: "user1",
//     text: "Yes! It’s a 2021 model and in great condition.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg9",
//     conversationId: "convo2",
//     senderId: "user3",
//     text: "Can I come check it this weekend?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg10",
//     conversationId: "convo2",
//     senderId: "user1",
//     text: "Absolutely. Saturday works?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg11",
//     conversationId: "convo2",
//     senderId: "user3",
//     text: "Yes. Morning would be best.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg12",
//     conversationId: "convo2",
//     senderId: "user1",
//     text: "Cool, I’ll send the location.",
//     createdAt: new Date(),
//   },

//   // convo3
//   {
//     id: "msg13",
//     conversationId: "convo3",
//     senderId: "user4",
//     text: "Hi, the land you posted, is it negotiable?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg14",
//     conversationId: "convo3",
//     senderId: "user1",
//     text: "It depends. What’s your offer?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg15",
//     conversationId: "convo3",
//     senderId: "user4",
//     text: "Around 950k ETB?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg16",
//     conversationId: "convo3",
//     senderId: "user1",
//     text: "Hmm, let me ask the owner.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg17",
//     conversationId: "convo3",
//     senderId: "user1",
//     text: "Okay, he said 980k is the lowest.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg18",
//     conversationId: "convo3",
//     senderId: "user4",
//     text: "Alright, I’ll think about it.",
//     createdAt: new Date(),
//   },

//   // convo4
//   {
//     id: "msg19",
//     conversationId: "convo4",
//     senderId: "user5",
//     text: "Hello! Is the warehouse near Mexico Square?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg20",
//     conversationId: "convo4",
//     senderId: "user1",
//     text: "Yes, just a 5-minute walk away.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg21",
//     conversationId: "convo4",
//     senderId: "user5",
//     text: "Sounds good. Can you share interior photos?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg22",
//     conversationId: "convo4",
//     senderId: "user1",
//     text: "Sure, sending now...",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg23",
//     conversationId: "convo4",
//     senderId: "user5",
//     text: "Got it. Looks nice!",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg24",
//     conversationId: "convo4",
//     senderId: "user1",
//     text: "Thanks, happy to show it anytime.",
//     createdAt: new Date(),
//   },

//   // convo5
//   {
//     id: "msg25",
//     conversationId: "convo5",
//     senderId: "user6",
//     text: "Is this house family-friendly?",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg26",
//     conversationId: "convo5",
//     senderId: "user1",
//     text: "Very! Quiet neighborhood, close to schools.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg27",
//     conversationId: "convo5",
//     senderId: "user6",
//     text: "That’s exactly what I’m looking for.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg28",
//     conversationId: "convo5",
//     senderId: "user1",
//     text: "Let me know if you want a tour.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg29",
//     conversationId: "convo5",
//     senderId: "user6",
//     text: "Yes, this Friday please.",
//     createdAt: new Date(),
//   },
//   {
//     id: "msg30",
//     conversationId: "convo5",
//     senderId: "user1",
//     text: "Booked. Looking forward to it!",
//     createdAt: new Date(),
//   },
// ];

// Define Zustand Store
interface BrokerState {
  listings: Listing[];
  ads: Ads[];
  likedIds: string[];
  chatMessages: Record<string, string[]>; // userId -> messages

  likeListing: (id: string) => void;
  sendMessage: (userId: string, message: string) => void;
}

export const useBrokerStore = create<BrokerState>((set) => ({
  listings: dummyListings,
  ads: dummyAds,
  likedIds: [],
  chatMessages: {},

  likeListing: (id) =>
    set((state) => ({
      likedIds: state.likedIds.includes(id)
        ? state.likedIds.filter((x) => x !== id)
        : [...state.likedIds, id],
    })),

  sendMessage: (userId, message) =>
    set((state) => ({
      chatMessages: {
        ...state.chatMessages,
        [userId]: [...(state.chatMessages[userId] || []), message],
      },
    })),
}));
