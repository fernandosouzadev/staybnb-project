import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { triggerChunked } from "@/app/actions/triggerChunked";
import { triggerNovu } from "@/app/actions/triggerNovu";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    const userAnotherId = conversation?.users.find(
      (user) => user.id !== currentUser.id
    );
    const userAnother = await prisma.user.findUnique({
      where: {
        id: userAnotherId?.id,
      },
    });
    const listing = await prisma.listing.findUnique({
      where: {
        id: conversation?.listingId,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // Find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // Update seen of last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await triggerChunked(currentUser.email!, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    triggerNovu({
      email: userAnother?.email!,
      payload: {
        userName: currentUser.name!,
        userAvatar: currentUser.image
          ? currentUser.image
          : `${request.headers.get("host")}/images/placeholder.png`,
        userComment: updatedMessage.body!,
        replyUrl: `${request.headers.get(
          "host"
        )}/conversations/${conversationId}`,
        fileName: listing?.title,
      },
      subscriberId: userAnother?.email!,
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await triggerChunked(conversationId!, "message:update", updatedMessage);

    return new NextResponse("Success");
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse("Error", { status: 500 });
  }
}
