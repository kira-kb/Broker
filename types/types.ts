import { StaticImageData } from "next/image";

export type ListingType = ("rent" | "sale")[] | ["rent", "sale"];
export interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  type: ListingType;
  details: {
    label: string;
    value: string | number;
    icon: React.ElementType;
  }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
  // Optionally
  avatar?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: Date;
  // Optional expansion if needed:
  sender?: User;
}

export interface Conversation {
  id: string;
  userId: string;
  listingId: string;
  newMessageCount: number;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: string;
  // Optional expansions if you populate them:
  user: User;
  listing?: Listing;
  messages?: Message[];
}

// export interface Conversation {
//   id: string;
//   listingId: string;
//   userName: string;
//   userImage: string;
//   lastMessage: string;
//   timestamp: string;
//   newMessageCount?: number;
// }

// export interface Message {
//   id: string;
//   sender: "user" | "admin";
//   content: string;
// }

// interface Message {
//   id: string;
//   conversationId: string;
//   senderId: string;
//   text: string;
//   createdAt: Date;
// }

// interface Conversation {
//   id: string;
//   userId: string;
//   listingId: string;
//   messages: Message[];
//   createdAt: Date;
// }

export interface Ads {
  id: number;
  src: StaticImageData | string;
  title: string;
  description: string;
  note: string;
  link: string;
  cta: string;
}
