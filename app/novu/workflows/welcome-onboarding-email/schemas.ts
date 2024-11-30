import { z } from "zod";

// Schema para a notificação In-App (Inbox)
export const inboxSchema = z.object({
  senderName: z
    .string()
    .describe("Name of the user who sent the message")
    .default("User Name"), // Nome do usuário que enviou a mensagem
  senderAvatar: z
    .string()
    .url()
    .describe("Avatar of the sender")
    .default("https://avatars.githubusercontent.com/u/77433905?s=200&v=4"), // Avatar do usuário
  messagePreview: z
    .string()
    .describe("A preview of the message content")
    .default("This is a preview of the message..."), // Previsão da mensagem
  messageLink: z
    .string()
    .url()
    .describe("URL to view the full message")
    .default("https://example.com/message"), // Link para a mensagem completa
  buttonText: z
    .string()
    .describe("Text for the button")
    .default("Go to Message"), // Texto do botão
  buttonLink: z
    .string()
    .url()
    .describe("Link for the button to go to the message")
    .default("https://example.com/message"), // Link do botão para a mensagem
});
