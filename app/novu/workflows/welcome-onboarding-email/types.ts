import { z } from "zod";
import { inboxSchema } from "./schemas";

export type InboxSchema = z.infer<typeof inboxSchema>;
