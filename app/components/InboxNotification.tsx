"use client";

import { Inbox } from "@novu/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Novu() {
  const router = useRouter();
  const { data } = useSession();

  return (
    <Inbox
      applicationIdentifier="UJGVLDHdQRZn"
      subscriberId={data?.user?.email!}
      routerPush={(path: string) => router.push(path)}
    />
  );
}
