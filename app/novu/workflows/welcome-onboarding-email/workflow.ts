import { workflow } from "@novu/framework";
import { inboxSchema } from "./schemas";

export const welcomeOnboardingEmail = workflow(
  "chat-message",
  async ({ step, payload }) => {
    await step.inApp("In-App Step", async () => {
      return {
        subject: `Message from ${payload.senderName}`,
        body: payload.messagePreview,
        avatar: payload.senderAvatar,
        button: {
          text: payload.buttonText,
          link: payload.buttonLink,
        },
      };
    });
  },
  {
    payloadSchema: inboxSchema,
  }
);
