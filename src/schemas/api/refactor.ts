import { z } from "zod";

// Not fun that we're maintaining this in two places but it's fine for now
const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "JSX",
  "TSX",
  "Java",
  "C#",
  "C++",
  "C",
  "Go",
  "PHP",
  "Rust",
  "Swift",
  "Ruby",
  "Kotlin",
] as const;
const languagesZodEnum = z.enum(languages);

const models = ["gpt-3.5-turbo", "gpt-4"] as const;
const modelsZodEnum = z.enum(models);

const messageSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  content: z.string(),
  role: z.union([
    z.literal("system"),
    z.literal("user"),
    z.literal("assistant"),
    z.literal("function"),
  ]),
  name: z.string().optional(),
  function_call: z.union([z.string(), z.any()]).optional(),
});

export const refactorRequestBodySchema = z.object({
  apiKey: z.string(),
  model: modelsZodEnum,
  language: languagesZodEnum,
  considerations: z.array(z.string()),
  messages: z.array(messageSchema),
  additionalInstructions: z
    .string()
    .max(300, "Additional instructions cannot exceed 300 characters."),
});
export type RefactorRequestBody = z.infer<typeof refactorRequestBodySchema>;
