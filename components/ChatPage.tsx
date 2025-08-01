"use client";

import * as React from "react";
import { MoreVertical, ArrowUp, ArrowLeft, View } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useBrokerStore } from "@/state/state";
import { Conversation, Message } from "@/types/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function ChatPage({
  messages,
  conversations,
}: {
  messages: Message[];
  conversations: Conversation[];
}) {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [mobileView, setMobileView] = React.useState<"inbox" | "chat">("inbox");
  // const [showListing, setShowListing] = React.useState(false);
  const [selectedConvoId, setSelectedConvoId] = React.useState("");
  const [input, setInput] = React.useState("");
  const { listings } = useBrokerStore();

  const activeConversation = conversations.find(
    (c) => c.id === selectedConvoId
  );
  const activeListing = activeConversation
    ? listings?.[Number(activeConversation.listingId)]
    : null;
  const activeMessages =
    messages.filter((msg) => msg.conversationId === selectedConvoId) || [];

  return (
    <div className="h-screen w-full">
      {isMobile ? (
        <>
          {mobileView === "inbox" ? (
            <div className="flex h-full flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold tracking-tight">Inbox</h2>
              </div>
              <ScrollArea className="flex-1">
                {conversations.map((convo) => (
                  <Button
                    key={convo.id}
                    variant="ghost"
                    onClick={() => {
                      setSelectedConvoId(convo.id);
                      setMobileView("chat");
                    }}
                    className={cn(
                      "w-full h-auto justify-start p-4 rounded-none",
                      selectedConvoId === convo.id && "bg-muted"
                    )}
                  >
                    <div className="flex items-start space-x-4 text-left w-full">
                      <Avatar>
                        <AvatarImage
                          src={convo.user?.avatar}
                          alt={convo.user?.email}
                        />
                        <AvatarFallback>
                          {convo.user?.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{convo.user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(convo.updatedAt, "Do")}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {convo.lastMessage.length > 45
                            ? convo.lastMessage.slice(0, 30) + "..."
                            : convo.lastMessage}
                        </p>
                        {convo.newMessageCount > 0 && (
                          <Badge className="float-right mt-1">
                            {convo.newMessageCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-col h-screen">
              <Card className="flex flex-col h-full rounded-none border-0">
                <CardHeader className="flex flex-row items-center border-b p-0">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileView("inbox")}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <Avatar>
                      <AvatarImage src={activeConversation?.user.avatar} />
                      <AvatarFallback>
                        {activeConversation?.user.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {activeConversation?.user.name}
                      </p>
                    </div>
                  </div>

                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => setShowListing((prev) => !prev)}
                  >
                    <View className="h-4 w-4" />
                  </Button> */}

                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <View className="h-4 w-4" />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                        <DrawerHeader>
                          <DrawerTitle>List</DrawerTitle>
                          <DrawerDescription> </DrawerDescription>
                        </DrawerHeader>
                        <Card className="flex-1">
                          <CardHeader className="p-0">
                            <Image
                              src={activeListing?.image || ""}
                              alt={activeListing?.title || ""}
                              className="w-full h-48 object-cover rounded-t-lg"
                              width={400}
                              height={200}
                            />
                          </CardHeader>
                          <CardContent className="p-4 space-y-4 overflow-y-scroll">
                            {/* <ScrollArea></ScrollArea> */}
                            <CardTitle>{activeListing?.title}</CardTitle>
                            <div className="space-y-3 text-sm">
                              {activeListing?.details.map((detail) => (
                                <div
                                  key={detail.label}
                                  className="flex items-center gap-2 text-muted-foreground"
                                >
                                  <detail.icon className="h-4 w-4" />
                                  <span>{detail.value}</span>
                                </div>
                              ))}
                            </div>
                            <div className="pt-4">
                              <p className="text-sm font-semibold mb-2">
                                Inquiry from:
                              </p>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage
                                    src={activeConversation?.user.avatar}
                                  />
                                  <AvatarFallback>
                                    {activeConversation?.user.name.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">
                                    {activeConversation?.user.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        {/* <DrawerFooter>
                        </DrawerFooter> */}
                      </div>
                    </DrawerContent>
                  </Drawer>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-0">
                    {/* <div className="space-y-4"> */}
                    {activeMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex w-max max-w-[70%] flex-col gap-2 rounded-lg px-3 py-2 text-sm mb-1",
                          msg.senderId === "user1"
                            ? " bg-primary text-primary-foreground ml-auto"
                            : "bg-muted"
                        )}
                      >
                        {msg.text}
                      </div>
                    ))}
                    {/* </div> */}
                  </ScrollArea>
                </CardContent>
                <CardFooter className="px-4 py-2 border-t">
                  <form className="flex w-full items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
              {/* {showListing && activeListing && (
                <ScrollArea className="h-80 border-t">
                  <Card className="rounded-none">
                    <CardHeader className="p-0">
                      <Image
                        src={activeListing.image}
                        alt={activeListing.title}
                        className="w-full h-48 object-cover"
                        width={400}
                        height={200}
                      />
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <CardTitle>{activeListing.title}</CardTitle>
                      <div className="space-y-3 text-sm">
                        {activeListing.details.map((detail) => (
                          <div
                            key={detail.label}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <detail.icon className="h-4 w-4" />
                            <span>{detail.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4">
                        <p className="text-sm font-semibold mb-2">
                          Inquiry from:
                        </p>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={activeConversation?.user.avatar}
                            />
                            <AvatarFallback>
                              {activeConversation?.user.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {activeConversation?.user.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollArea>
              )} */}
            </div>
          )}
        </>
      ) : isTablet ? (
        <>
          {mobileView === "inbox" ? (
            <div className="flex h-full flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold tracking-tight">Inbox</h2>
              </div>
              <ScrollArea className="flex-1">
                {conversations.map((convo) => (
                  <Button
                    key={convo.id}
                    variant="ghost"
                    onClick={() => {
                      setSelectedConvoId(convo.id);
                      setMobileView("chat");
                    }}
                    className={cn(
                      "w-full h-auto justify-start p-4 rounded-none",
                      selectedConvoId === convo.id && "bg-muted"
                    )}
                  >
                    <div className="flex items-start space-x-4 text-left w-full">
                      <Avatar>
                        <AvatarImage
                          src={convo.user?.avatar}
                          alt={convo.user?.email}
                        />
                        <AvatarFallback>
                          {convo.user?.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{convo.user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(convo.updatedAt, "Do")}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {convo.lastMessage.length > 45
                            ? convo.lastMessage.slice(0, 30) + "..."
                            : convo.lastMessage}
                        </p>
                        {convo.newMessageCount > 0 && (
                          <Badge className="float-right mt-1">
                            {convo.newMessageCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </ScrollArea>
            </div>
          ) : (
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={50} minSize={35}>
                <div className="flex h-full flex-col">
                  {activeConversation ? (
                    <Card className="flex flex-col h-full rounded-none border-0">
                      <CardHeader className="flex flex-row items-center border-b">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileView("inbox")}
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4 p-0">
                          <Avatar className="">
                            <AvatarImage src={activeConversation.user.name} />
                            <AvatarFallback>
                              {activeConversation.user.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {activeConversation.user.name}
                            </p>
                          </div>
                        </div>
                        {/* <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto p-0"
                        >
                          <MoreVertical />
                        </Button> */}
                      </CardHeader>

                      <CardContent className="flex-1 p-0">
                        {/* <ScrollArea className="h-full p-4"> */}
                        <ScrollArea className="space-y-4 h-full px-4">
                          {activeMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={cn(
                                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 mb-2 text-sm",
                                msg.senderId === "user1"
                                  ? "ml-auto bg-primary text-primary-foreground"
                                  : "bg-muted"
                              )}
                            >
                              {msg.text}
                            </div>
                          ))}
                        </ScrollArea>
                        {/* </ScrollArea> */}
                      </CardContent>

                      <CardFooter className="px-4 border-t">
                        <form
                          // onSubmit={handleSendMessage}
                          className="flex w-full items-center space-x-2"
                        >
                          <Input
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />
                          <Button type="submit">
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                        </form>
                      </CardFooter>
                    </Card>
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      Select a conversation
                    </div>
                  )}
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={35}>
                <ScrollArea className="flex h-full flex-col p-4">
                  {activeListing ? (
                    <Card className="flex-1">
                      <CardHeader className="p-0">
                        <Image
                          src={activeListing.image}
                          alt={activeListing.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                          width={400}
                          height={200}
                        />
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <CardTitle>{activeListing.title}</CardTitle>
                        <div className="space-y-3 text-sm">
                          {activeListing.details.map((detail) => (
                            <div
                              key={detail.label}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <detail.icon className="h-4 w-4" />
                              <span>{detail.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4">
                          <p className="text-sm font-semibold mb-2">
                            Inquiry from:
                          </p>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={activeConversation?.user.avatar}
                              />
                              <AvatarFallback>
                                {activeConversation?.user.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {activeConversation?.user.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p>No item selected</p>
                    </div>
                  )}
                </ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}{" "}
        </>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={35} minSize={25}>
            <ScrollArea className="flex-1">
              <div className="flex h-full flex-col">
                <div className="py-2 border-b">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Inbox
                  </h2>
                </div>
                {conversations.map((convo) => (
                  <Button
                    key={convo.id}
                    variant="ghost"
                    onClick={() => setSelectedConvoId(convo.id)}
                    className={cn(
                      "w-full h-auto justify-start p-4 rounded-none",
                      selectedConvoId === convo.id && "bg-muted"
                    )}
                  >
                    <div className="flex items-start space-x-4 text-left w-full">
                      <Avatar>
                        <AvatarImage
                          src={convo.user?.avatar}
                          alt={convo.user?.email}
                        />
                        <AvatarFallback>
                          {convo.user?.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{convo.user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {/* {convo.updatedAt.toUTCString()} */}
                            {format(new Date(convo.updatedAt), "p")}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {convo.lastMessage.length > 45
                            ? convo.lastMessage.slice(0, 40) + "..."
                            : convo.lastMessage}
                        </p>
                        {convo.newMessageCount > 0 ? (
                          <Badge className="float-right mt-1">
                            {convo.newMessageCount}
                          </Badge>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={65} minSize={40}>
            <ResizablePanelGroup direction="horizontal">
              {/* <ResizablePanel defaultSize={70} minSize={30}> */}
              <ResizablePanel defaultSize={70} minSize={50}>
                <div className="flex h-full flex-col">
                  {activeConversation ? (
                    <Card className="flex flex-col h-full rounded-none border-0">
                      <CardHeader className="flex flex-row items-center border-b py-0">
                        <div className="flex items-center space-x-4 p-0">
                          <Avatar className="py-0">
                            <AvatarImage
                              className="py-0"
                              src={activeConversation.user.name}
                            />
                            <AvatarFallback className="py-0">
                              {activeConversation.user.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="py-0">
                            <p className="font-medium py-0">
                              {activeConversation.user.name}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto p-0"
                        >
                          <MoreVertical />
                        </Button>
                      </CardHeader>

                      <CardContent className="flex-1 p-0">
                        {/* <ScrollArea className="h-full p-4"> */}
                        <ScrollArea className="space-y-4 h-full px-4">
                          {activeMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={cn(
                                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 mb-2 text-sm",
                                msg.senderId === "user1"
                                  ? "ml-auto bg-primary text-primary-foreground"
                                  : "bg-muted"
                              )}
                            >
                              {msg.text}
                            </div>
                          ))}
                        </ScrollArea>
                        {/* </ScrollArea> */}
                      </CardContent>

                      <CardFooter className="px-4 border-t">
                        <form
                          // onSubmit={handleSendMessage}
                          className="flex w-full items-center space-x-2"
                        >
                          <Input
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />
                          <Button type="submit">
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                        </form>
                      </CardFooter>
                    </Card>
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      Select a conversation
                    </div>
                  )}
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={35} minSize={25}>
                <ScrollArea className="flex h-full flex-col p-4">
                  {/* {activeListing ? (
                    <Card className="flex-1">
                      <CardHeader className="p-0">
                        <Image
                          src={activeListing.image}
                          alt={activeListing.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                          width={400}
                          height={200}
                        />
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <CardTitle>{activeListing.title}</CardTitle>
                        <div className="space-y-3 text-sm">
                          {activeListing.details.map((detail) => (
                            <div
                              key={detail.label}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <detail.icon className="h-4 w-4" />
                              <span>{detail.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4">
                          <p className="text-sm font-semibold mb-2">
                            Inquiry from:
                          </p>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={activeConversation?.user.avatar}
                              />
                              <AvatarFallback>
                                {activeConversation?.user.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {activeConversation?.user.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p>No item selected</p>
                    </div>
                  )} */}
                  {activeListing ? (
                    <Card className="flex-1">
                      <CardHeader className="p-0">
                        <Image
                          src={activeListing.image}
                          alt={activeListing.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                          width={400}
                          height={200}
                        />
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <CardTitle>{activeListing.title}</CardTitle>
                        <div className="space-y-3 text-sm">
                          {activeListing.details.map((detail) => (
                            <div
                              key={detail.label}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <detail.icon className="h-4 w-4" />
                              <span>{detail.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4">
                          <p className="text-sm font-semibold mb-2">
                            Inquiry from:
                          </p>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={activeConversation?.user.avatar}
                              />
                              <AvatarFallback>
                                {activeConversation?.user.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {activeConversation?.user.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p>No item selected</p>
                    </div>
                  )}
                </ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}

// ??????????????????????????????????????????????????????????????????????????????????
// "use client";

// import * as React from "react";
// import { MoreVertical, ArrowUp } from "lucide-react";

// import { cn } from "@/lib/utils";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { useBrokerStore } from "@/state/state";
// import { Conversation, Message } from "@/types/types";

// import { format } from "date-fns";

// // Dummy Conversations
// const conversations: Conversation[] = [
//   {
//     id: "convo1",
//     userId: "user2",
//     listingId: "1",
//     newMessageCount: 3,
//     createdAt: new Date("2025-07-27T09:00:00Z"),
//     updatedAt: new Date("2025-07-27T09:00:00Z"),
//     lastMessage: "Hi, I saw your listing in Bole. Is it available?",
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
//     listingId: "2",
//     newMessageCount: 0,
//     createdAt: new Date("2025-07-27T09:05:00Z"),
//     updatedAt: new Date("2025-07-27T09:05:00Z"),
//     lastMessage: "Hi, I saw your listing in Bole. Is it available?",
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
//     listingId: "3",
//     newMessageCount: 1,
//     createdAt: new Date("2025-07-27T09:10:00Z"),
//     updatedAt: new Date("2025-07-27T09:10:00Z"),
//     lastMessage: "Hi, I saw your listing in Bole. Is it available?",
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
//     listingId: "4",
//     newMessageCount: 4,
//     createdAt: new Date("2025-07-27T09:15:00Z"),
//     updatedAt: new Date("2025-07-27T09:15:00Z"),
//     lastMessage: "Hi, I saw your listing in Bole. Is it available?",
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
//     listingId: "5",
//     newMessageCount: 0,
//     createdAt: new Date("2025-07-27T09:20:00Z"),
//     updatedAt: new Date("2025-07-27T09:20:00Z"),
//     lastMessage: "Hi, I saw your listing in Bole. Is it available?",
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

// // --- COMPONENT ---
// export default function AdvancedChatPage() {
//   const [selectedConvoId, setSelectedConvoId] = React.useState("");
//   const [input, setInput] = React.useState("");

//   const { listings } = useBrokerStore();

//   const activeConversation = conversations.find(
//     (c) => c.id === selectedConvoId
//   );

//   const activeListing = activeConversation
//     ? listings?.[Number(activeConversation.listingId)]
//     : null;

//   // const activeMessages = messages[selectedConvoId] || [];
//   const activeMessages =
//     messages.filter((msg) => msg.conversationId === selectedConvoId) || [];

//   // const handleSendMessage = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!input.trim() || !selectedConvoId) return;

//   //   const newMessage: Message = {
//   //     id: `msg${Date.now()}`,
//   //     sender: "admin",
//   //     content: input,
//   //   };

//   //   setMessages((prev) => ({
//   //     ...prev,
//   //     [selectedConvoId]: [...(prev[selectedConvoId] || []), newMessage],
//   //   }));

//   //   setInput("");
//   // };

//   return (
//     <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
//       {/* INBOX */}
//       <ResizablePanel defaultSize={25} minSize={25}>
//         <ScrollArea className="flex-1">
//           <div className="flex h-full flex-col">
//             <div className="py-2 border-b">
//               <h2 className="text-xl font-semibold tracking-tight">Inbox</h2>
//             </div>
//             {conversations.map((convo) => (
//               <Button
//                 key={convo.id}
//                 variant="ghost"
//                 onClick={() => setSelectedConvoId(convo.id)}
//                 className={cn(
//                   "w-full h-auto justify-start p-4 rounded-none",
//                   selectedConvoId === convo.id && "bg-muted"
//                 )}
//               >
//                 <div className="flex items-start space-x-4 text-left w-full">
//                   <Avatar>
//                     <AvatarImage
//                       src={convo.user?.avatar}
//                       alt={convo.user?.email}
//                     />
//                     <AvatarFallback>
//                       {convo.user?.name.slice(0, 2).toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="flex justify-between items-center">
//                       <p className="font-semibold">{convo.user?.name}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {/* {convo.updatedAt.toUTCString()} */}
//                         {format(new Date(convo.updatedAt), "p")}
//                       </p>
//                     </div>
//                     <p className="text-sm text-muted-foreground truncate">
//                       {convo.lastMessage.length > 45
//                         ? convo.lastMessage.slice(0, 40) + "..."
//                         : convo.lastMessage}
//                     </p>
//                     {convo.newMessageCount > 0 ? (
//                       <Badge className="float-right mt-1">
//                         {convo.newMessageCount}
//                       </Badge>
//                     ) : (
//                       ""
//                     )}
//                   </div>
//                 </div>
//               </Button>
//             ))}
//           </div>
//         </ScrollArea>
//       </ResizablePanel>

//       <ResizableHandle withHandle />

//       {/* RIGHT PANEL - Chat + Inbox */}
//       <ResizablePanel defaultSize={75} minSize={40}>
//         <ResizablePanelGroup direction="horizontal">
//           {/* CHAT WINDOW */}
//           <ResizablePanel defaultSize={70} minSize={50}>
//             <div className="flex h-full flex-col">
//               {activeConversation ? (
//                 <Card className="flex flex-col h-full rounded-none border-0">
//                   <CardHeader className="flex flex-row items-center border-b">
//                     <div className="flex items-center space-x-4 p-0">
//                       <Avatar className="">
//                         <AvatarImage src={activeConversation.user.name} />
//                         <AvatarFallback>
//                           {activeConversation.user.name.slice(0, 2)}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium">
//                           {activeConversation.user.name}
//                         </p>
//                       </div>
//                     </div>
//                     <Button variant="ghost" size="icon" className="ml-auto p-0">
//                       <MoreVertical />
//                     </Button>
//                   </CardHeader>

//                   <CardContent className="flex-1 p-0">
//                     {/* <ScrollArea className="h-full p-4"> */}
//                     <ScrollArea className="space-y-4 h-full px-4">
//                       {activeMessages.map((msg) => (
//                         <div
//                           key={msg.id}
//                           className={cn(
//                             "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 mb-2 text-sm",
//                             msg.senderId === "user1"
//                               ? "ml-auto bg-primary text-primary-foreground"
//                               : "bg-muted"
//                           )}
//                         >
//                           {msg.text}
//                         </div>
//                       ))}
//                     </ScrollArea>
//                     {/* </ScrollArea> */}
//                   </CardContent>

//                   <CardFooter className="px-4 border-t">
//                     <form
//                       // onSubmit={handleSendMessage}
//                       className="flex w-full items-center space-x-2"
//                     >
//                       <Input
//                         placeholder="Type a message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                       />
//                       <Button type="submit">
//                         <ArrowUp className="h-4 w-4" />
//                       </Button>
//                     </form>
//                   </CardFooter>
//                 </Card>
//               ) : (
//                 <div className="flex h-full items-center justify-center text-muted-foreground">
//                   Select a conversation
//                 </div>
//               )}
//             </div>
//           </ResizablePanel>

//           <ResizableHandle withHandle />

//           {/* LEFT PANEL - Listing Details */}
//           <ResizablePanel defaultSize={30} minSize={30}>
//             <ScrollArea className="flex h-full flex-col p-4">
//               {activeListing ? (
//                 <Card className="flex-1">
//                   <CardHeader className="p-0">
//                     <Image
//                       src={activeListing.image}
//                       alt={activeListing.title}
//                       className="w-full h-48 object-cover rounded-t-lg"
//                       width={400}
//                       height={200}
//                     />
//                   </CardHeader>
//                   <CardContent className="p-4 space-y-4">
//                     <CardTitle>{activeListing.title}</CardTitle>
//                     <div className="space-y-3 text-sm">
//                       {activeListing.details.map((detail) => (
//                         <div
//                           key={detail.label}
//                           className="flex items-center gap-2 text-muted-foreground"
//                         >
//                           <detail.icon className="h-4 w-4" />
//                           <span>{detail.value}</span>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="pt-4">
//                       <p className="text-sm font-semibold mb-2">
//                         Inquiry from:
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <Avatar>
//                           <AvatarImage src={activeConversation?.user.avatar} />
//                           <AvatarFallback>
//                             {activeConversation?.user.name.slice(0, 2)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium text-sm">
//                             {activeConversation?.user.name}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-muted-foreground">
//                   <p>No item selected</p>
//                 </div>
//               )}
//             </ScrollArea>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   );
// }

// ???????????????????????????????????????????????????????????????????????????????
// "use client";

// import * as React from "react";
// import { MoreVertical, ArrowUp } from "lucide-react";

// import { cn } from "@/lib/utils";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { useBrokerStore } from "@/state/state";
// import { Conversation, Message } from "@/types/types";

// // --- Dummy Conversations ---
// const conversations: Conversation[] = [
//   {
//     id: "convo1",
//     listingId: "0",
//     userName: "Alice Johnson",
//     userImage: "/avatars/01.png",
//     lastMessage: "Is the price negotiable?",
//     timestamp: "5m",
//     newMessageCount: 7,
//   },
//   {
//     id: "convo2",
//     listingId: "1",
//     userName: "Bob Williams",
//     userImage: "/avatars/02.png",
//     lastMessage: "Can I schedule a test drive?",
//     timestamp: "1h",
//   },
// ];

// // --- Message Map ---
// const initialMessages: Record<string, Message[]> = {
//   convo1: [
//     {
//       id: "msg1",
//       sender: "user",
//       content: "Hello, I'm interested in the modern house in Bole.",
//     },
//     {
//       id: "msg2",
//       sender: "admin",
//       content: "Great! It's a fantastic property. How can I help you?",
//     },
//     { id: "msg3", sender: "user", content: "Is the price negotiable?" },
//   ],
//   convo2: [
//     {
//       id: "msg4",
//       sender: "user",
//       content: "Hi, about the Toyota Vitz, is it still available?",
//     },
//     {
//       id: "msg5",
//       sender: "admin",
//       content: "Yes, it is. We just listed it yesterday.",
//     },
//     { id: "msg6", sender: "user", content: "Can I schedule a test drive?" },
//   ],
// };

// // --- COMPONENT ---
// export default function AdvancedChatPage() {
//   const [selectedConvoId, setSelectedConvoId] = React.useState("convo1");
//   const [messages, setMessages] = React.useState(initialMessages);
//   const [input, setInput] = React.useState("");

//   const { listings } = useBrokerStore();

//   const activeConversation = conversations.find(
//     (c) => c.id === selectedConvoId
//   );

//   const activeListing = activeConversation
//     ? listings?.[Number(activeConversation.listingId)]
//     : null;

//   const activeMessages = messages[selectedConvoId] || [];

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || !selectedConvoId) return;

//     const newMessage: Message = {
//       id: `msg${Date.now()}`,
//       sender: "admin",
//       content: input,
//     };

//     setMessages((prev) => ({
//       ...prev,
//       [selectedConvoId]: [...(prev[selectedConvoId] || []), newMessage],
//     }));

//     setInput("");
//   };

//   return (
//     <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
//       {/* LEFT PANEL - Listing Details */}
//       <ResizablePanel defaultSize={35} minSize={25}>
//         <div className="flex h-full flex-col p-4">
//           {activeListing ? (
//             <Card className="flex-1">
//               <CardHeader className="p-0">
//                 <Image
//                   src={activeListing.image}
//                   alt={activeListing.title}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                   width={400}
//                   height={200}
//                 />
//               </CardHeader>
//               <CardContent className="p-4 space-y-4">
//                 <CardTitle>{activeListing.title}</CardTitle>
//                 <div className="space-y-3 text-sm">
//                   {activeListing.details.map((detail) => (
//                     <div
//                       key={detail.label}
//                       className="flex items-center gap-2 text-muted-foreground"
//                     >
//                       <detail.icon className="h-4 w-4" />
//                       <span>{detail.value}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="pt-4">
//                   <p className="text-sm font-semibold mb-2">Inquiry from:</p>
//                   <div className="flex items-center gap-3">
//                     <Avatar>
//                       <AvatarImage src={activeConversation?.userImage} />
//                       <AvatarFallback>
//                         {activeConversation?.userName.slice(0, 2)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium text-sm">
//                         {activeConversation?.userName}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="flex items-center justify-center h-full text-muted-foreground">
//               <p>No item selected</p>
//             </div>
//           )}
//         </div>
//       </ResizablePanel>

//       <ResizableHandle withHandle />

//       {/* RIGHT PANEL - Chat + Inbox */}
//       <ResizablePanel defaultSize={65} minSize={40}>
//         <ResizablePanelGroup direction="horizontal">
//           {/* CHAT WINDOW */}
//           <ResizablePanel defaultSize={70} minSize={30}>
//             <div className="flex h-full flex-col">
//               {activeConversation ? (
//                 <Card className="flex flex-col h-full rounded-none border-0">
//                   <CardHeader className="flex flex-row items-center border-b">
//                     <div className="flex items-center space-x-4">
//                       <Avatar>
//                         <AvatarImage src={activeConversation.userImage} />
//                         <AvatarFallback>
//                           {activeConversation.userName.slice(0, 2)}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium">
//                           {activeConversation.userName}
//                         </p>
//                       </div>
//                     </div>
//                     <Button variant="ghost" size="icon" className="ml-auto">
//                       <MoreVertical />
//                     </Button>
//                   </CardHeader>
//                   <CardContent className="flex-1 p-0">
//                     <ScrollArea className="h-full p-4">
//                       <div className="space-y-4">
//                         {activeMessages.map((msg) => (
//                           <div
//                             key={msg.id}
//                             className={cn(
//                               "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
//                               msg.sender === "admin"
//                                 ? "ml-auto bg-primary text-primary-foreground"
//                                 : "bg-muted"
//                             )}
//                           >
//                             {msg.content}
//                           </div>
//                         ))}
//                       </div>
//                     </ScrollArea>
//                   </CardContent>
//                   <CardFooter className="p-4 border-t">
//                     <form
//                       onSubmit={handleSendMessage}
//                       className="flex w-full items-center space-x-2"
//                     >
//                       <Input
//                         placeholder="Type a message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                       />
//                       <Button type="submit">
//                         <ArrowUp className="h-4 w-4" />
//                       </Button>
//                     </form>
//                   </CardFooter>
//                 </Card>
//               ) : (
//                 <div className="flex h-full items-center justify-center text-muted-foreground">
//                   Select a conversation
//                 </div>
//               )}
//             </div>
//           </ResizablePanel>

//           <ResizableHandle withHandle />

//           {/* INBOX */}
//           <ResizablePanel defaultSize={30} minSize={20}>
//             <div className="flex h-full flex-col">
//               <div className="p-4 border-b">
//                 <h2 className="text-xl font-semibold tracking-tight">Inbox</h2>
//               </div>
//               <ScrollArea className="flex-1">
//                 {conversations.map((convo) => (
//                   <Button
//                     key={convo.id}
//                     variant="ghost"
//                     onClick={() => setSelectedConvoId(convo.id)}
//                     className={cn(
//                       "w-full h-auto justify-start p-4 rounded-none",
//                       selectedConvoId === convo.id && "bg-muted"
//                     )}
//                   >
//                     <div className="flex items-start space-x-4 text-left w-full">
//                       <Avatar>
//                         <AvatarImage
//                           src={convo.userImage}
//                           alt={convo.userName}
//                         />
//                         <AvatarFallback>
//                           {convo.userName.slice(0, 2).toUpperCase()}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1">
//                         <div className="flex justify-between items-center">
//                           <p className="font-semibold">{convo.userName}</p>
//                           <p className="text-xs text-muted-foreground">
//                             {convo.timestamp}
//                           </p>
//                         </div>
//                         <p className="text-sm text-muted-foreground truncate">
//                           {convo.lastMessage}
//                         </p>
//                         {convo.newMessageCount && (
//                           <Badge className="float-right mt-1">
//                             {convo.newMessageCount}
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                   </Button>
//                 ))}
//               </ScrollArea>
//             </div>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   );
// }

// // ????????????????????????????????????????????????????????????????????
// // "use client";

// // import * as React from "react";
// // import { MoreVertical, ArrowUp } from "lucide-react";

// // import { cn } from "@/lib/utils"; // Adjust path if needed
// // import {
// //   ResizableHandle,
// //   ResizablePanel,
// //   ResizablePanelGroup,
// // } from "@/components/ui/resizable";
// // import {
// //   Card,
// //   CardContent,
// //   CardFooter,
// //   CardHeader,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { ScrollArea } from "@/components/ui/scroll-area";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { Badge } from "@/components/ui/badge";

// // // --- DATA MOCKING (for demonstration) ---
// // // In a real app, this would come from your API

// // type Conversation = {
// //   id: string;
// //   userName: string;
// //   userImage: string;
// //   lastMessage: string;
// //   timestamp: string;
// //   newMessageCount?: number;
// // };

// // const conversations: Conversation[] = [
// //   {
// //     id: "convo1",
// //     userName: "Alice Johnson",
// //     userImage: "/avatars/01.png",
// //     lastMessage: "Okay, I'll try that. Thank you!",
// //     timestamp: "5m",
// //     newMessageCount: 2,
// //   },
// //   {
// //     id: "convo2",
// //     userName: "Bob Williams",
// //     userImage: "/avatars/02.png",
// //     lastMessage: "I'm still having trouble with the payment.",
// //     timestamp: "1h",
// //   },
// //   {
// //     id: "convo3",
// //     userName: "Charlie Brown",
// //     userImage: "/avatars/03.png",
// //     lastMessage: "Perfect, it's working now.",
// //     timestamp: "3h",
// //   },
// //   {
// //     id: "convo4",
// //     userName: "Diana Miller",
// //     userImage: "/avatars/04.png",
// //     lastMessage: "Could you check my order status?",
// //     timestamp: "1d",
// //   },
// // ];

// // type Message = {
// //   id: string;
// //   sender: "user" | "admin";
// //   content: string;
// // };

// // const initialMessages: Record<string, Message[]> = {
// //   convo1: [
// //     {
// //       id: "msg1",
// //       sender: "user",
// //       content: "Hi, I can't seem to reset my password.",
// //     },
// //     {
// //       id: "msg2",
// //       sender: "admin",
// //       content:
// //         "Hi Alice, let me help you with that. Can you confirm your email?",
// //     },
// //     { id: "msg3", sender: "user", content: "Sure, it's alice.j@example.com" },
// //     {
// //       id: "msg4",
// //       sender: "admin",
// //       content: "Thanks. I've sent a reset link. Please check your inbox.",
// //     },
// //     { id: "msg5", sender: "user", content: "Okay, I'll try that. Thank you!" },
// //   ],
// //   convo2: [
// //     {
// //       id: "msg6",
// //       sender: "user",
// //       content: "I'm still having trouble with the payment.",
// //     },
// //   ],
// // };

// // // --- COMPONENT ---

// // export default function ResizableChatPage() {
// //   const [selectedConvoId, setSelectedConvoId] =
// //     React.useState<string>("convo1");
// //   const [messages, setMessages] = React.useState(initialMessages);
// //   const [input, setInput] = React.useState("");

// //   const activeConvo = conversations.find((c) => c.id === selectedConvoId);
// //   const activeMessages = messages[selectedConvoId] || [];

// //   const handleSendMessage = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!input.trim() || !selectedConvoId) return;

// //     const newMessage: Message = {
// //       id: `msg${Date.now()}`,
// //       sender: "admin", // Assuming the admin is sending the message
// //       content: input,
// //     };

// //     setMessages((prev) => ({
// //       ...prev,
// //       [selectedConvoId]: [...(prev[selectedConvoId] || []), newMessage],
// //     }));
// //     setInput("");
// //   };

// //   return (
// //     <ResizablePanelGroup
// //       direction="horizontal"
// //       className="h-screen w-full rounded-lg border"
// //     >
// //       {/* Left Panel: Conversation History List */}
// //       <ResizablePanel defaultSize={30} minSize={20}>
// //         <div className="flex h-full flex-col">
// //           <div className="p-4 border-b">
// //             <h2 className="text-xl font-semibold tracking-tight">Inbox</h2>
// //           </div>
// //           <ScrollArea className="flex-1">
// //             {conversations.map((convo) => (
// //               <Button
// //                 key={convo.id}
// //                 variant="ghost"
// //                 onClick={() => setSelectedConvoId(convo.id)}
// //                 className={cn(
// //                   "w-full h-auto justify-start p-4 rounded-none",
// //                   selectedConvoId === convo.id && "bg-muted"
// //                 )}
// //               >
// //                 <div className="flex items-start space-x-4 text-left w-full">
// //                   <Avatar>
// //                     <AvatarImage src={convo.userImage} alt={convo.userName} />
// //                     <AvatarFallback>
// //                       {convo.userName.slice(0, 2).toUpperCase()}
// //                     </AvatarFallback>
// //                   </Avatar>
// //                   <div className="flex-1">
// //                     <div className="flex justify-between items-center">
// //                       <p className="font-semibold">{convo.userName}</p>
// //                       <p className="text-xs text-muted-foreground">
// //                         {convo.timestamp}
// //                       </p>
// //                     </div>
// //                     <p className="text-sm text-muted-foreground truncate">
// //                       {convo.lastMessage}
// //                     </p>
// //                     {convo.newMessageCount && (
// //                       <Badge className="float-right mt-1">
// //                         {convo.newMessageCount}
// //                       </Badge>
// //                     )}
// //                   </div>
// //                 </div>
// //               </Button>
// //             ))}
// //           </ScrollArea>
// //         </div>
// //       </ResizablePanel>

// //       <ResizableHandle withHandle />

// //       {/* Right Panel: Active Chat Window */}
// //       <ResizablePanel defaultSize={70}>
// //         <div className="flex h-full flex-col">
// //           {activeConvo ? (
// //             <Card className="flex flex-col h-full rounded-none border-0">
// //               <CardHeader className="flex flex-row items-center border-b">
// //                 <div className="flex items-center space-x-4">
// //                   <Avatar>
// //                     <AvatarImage
// //                       src={activeConvo.userImage}
// //                       alt={activeConvo.userName}
// //                     />
// //                     <AvatarFallback>
// //                       {activeConvo.userName.slice(0, 2).toUpperCase()}
// //                     </AvatarFallback>
// //                   </Avatar>
// //                   <div>
// //                     <p className="font-medium">{activeConvo.userName}</p>
// //                     <p className="text-sm text-muted-foreground">Online</p>
// //                   </div>
// //                 </div>
// //                 <Button variant="ghost" size="icon" className="ml-auto">
// //                   <MoreVertical />
// //                 </Button>
// //               </CardHeader>

// //               <CardContent className="flex-1 p-0">
// //                 <ScrollArea className="h-full p-4">
// //                   <div className="space-y-4">
// //                     {activeMessages.map((msg) => (
// //                       <div
// //                         key={msg.id}
// //                         className={cn(
// //                           "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
// //                           msg.sender === "admin"
// //                             ? "ml-auto bg-primary text-primary-foreground"
// //                             : "bg-muted"
// //                         )}
// //                       >
// //                         {msg.content}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </ScrollArea>
// //               </CardContent>

// //               <CardFooter className="p-4 border-t">
// //                 <form
// //                   onSubmit={handleSendMessage}
// //                   className="flex w-full items-center space-x-2"
// //                 >
// //                   <Input
// //                     placeholder="Type a message..."
// //                     value={input}
// //                     onChange={(e) => setInput(e.target.value)}
// //                     onKeyDown={(e) =>
// //                       e.key === "Enter" &&
// //                       !e.nativeEvent.isComposing &&
// //                       handleSendMessage(e)
// //                     }
// //                   />
// //                   <Button type="submit">
// //                     <ArrowUp className="h-4 w-4" />
// //                     <span className="sr-only">Send</span>
// //                   </Button>
// //                 </form>
// //               </CardFooter>
// //             </Card>
// //           ) : (
// //             <div className="flex h-full items-center justify-center text-muted-foreground">
// //               Select a conversation to start chatting
// //             </div>
// //           )}
// //         </div>
// //       </ResizablePanel>
// //     </ResizablePanelGroup>
// //   );
// // }
