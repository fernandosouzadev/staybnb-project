import getConversations from "@/app/actions/getConversations";
import { ChatList } from "@/app/components/Message/ChatList";
import { ContainerChat } from "@/app/components/Message/ContainerChat";
import "@/app/globals.css";

export const metadata = {
  title: "Staybnb - Feel at Home, Anywhere You Go",
  description: "Staybnb - Vaction Rentals, Homes, Experiences & Places",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <ContainerChat>
      <ChatList initalConversation={conversations} />
      {children}
    </ContainerChat>
  );
}
