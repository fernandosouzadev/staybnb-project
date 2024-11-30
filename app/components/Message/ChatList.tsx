"use client";

import { bindWithChunking } from "@/app/actions/bindWithChunking";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import {
  Conversation,
  Listing,
  Message,
  Reservation,
  User,
} from "@prisma/client";
import axios from "axios";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { EmptyState } from "../EmptyState";
import { ChatCard } from "./ChatCard";

interface ChatListProps {
  initalConversation: (Conversation & {
    listing: Listing & {
      reservations: Reservation[];
    };
    messages: (Message & {
      sender: User;
      seen: User[];
    })[];
    users: User[];
  })[];
}

type FullConversationType = Conversation & {
  listing: Listing & {
    reservations: Reservation[];
  };
  messages: (Message & {
    sender: User;
    seen: User[];
  })[];
  users: User[];
};

export function ChatList({ initalConversation }: ChatListProps) {
  const [items, setItems] = useState(initalConversation);

  const router = useRouter();
  const { conversationId } = useConversation();
  const session = useSession();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const channel = pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    bindWithChunking(channel, "conversation:update", updateHandler);
    bindWithChunking(channel, "conversation:new", newHandler);
  }, [conversationId, pusherKey, router]);

  const handleNotification = () => {
    if (Notification.permission === "granted") {
      const audio = new Audio("/sound/notification.mp3");
      audio.play();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const audio = new Audio("/sound/notification.mp3");
          audio.play();
        }
      });
    }
  };

  return (
    <div
      className="mt-[2px] border-r border-t border-rose-50 bg-white focus:border-black"
      tabIndex={1}
    >
      <div className="border-b border-rose-50 flex flex-row justify-between items-center min-h-[80px] px-5">
        <div className="text-lg font-bold">Messages</div>
        <IoFilterSharp
          size="40px"
          className="p-2 rounded-full cursor-pointer transition hover:bg-neutral-50"
        />
      </div>
      <div className="px-5 flex flex-col gap-5">
        {items[0] ? (
          items
            .sort(
              (a, b) =>
                new Date(
                  b?.messages[b?.messages?.length - 1]?.createdAt
                ).getTime() -
                new Date(
                  a?.messages[a?.messages?.length - 1]?.createdAt
                ).getTime()
            )
            .map((conversation) => (
              <ChatCard
                key={conversation.id}
                data={conversation}
                notification={handleNotification}
              />
            ))
        ) : (
          <EmptyState
            title="You have no unread messages"
            subtitle="When you book a trip or experience, messages from your host will show up here."
            actionLabel="Explore Staybnb"
            showReset
          />
        )}
      </div>
    </div>
  );
}
