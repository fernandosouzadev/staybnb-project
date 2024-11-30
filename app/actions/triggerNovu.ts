import { Novu } from "@novu/node";

const novu = new Novu("8b1d82ca48ef5f1cb16aa6446d118cac");

type triggerNovuProps = {
  subscriberId: string;
  email: string;
  payload: {
    userName: string;
    userAvatar: string;
    userComment: string;
    replyUrl: string;
    fileName?: string;
  };
};

export function triggerNovu({
  email,
  payload,
  subscriberId,
}: triggerNovuProps) {
  novu.trigger("demo-comment-on-task", {
    to: {
      subscriberId: subscriberId,
      email: email,
    },
    payload: payload,
  });
}
