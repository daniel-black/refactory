import { z } from "zod";

const responseFormats = ["code-only", "code-with-comments"] as const;
const responseFormatsZodEnum = z.enum(responseFormats);
export type ResponseFormat = z.infer<typeof responseFormatsZodEnum>;

// Not fun that we're maintaining this in two places but it's fine for now
const languages = [
  "JavaScript",
  "React",
  "TypeScript",
  "TypeScript React",
  "Python",
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
  "Scala",
  "Lisp",
  "Clojure",
  "Julia",
  "Other",
] as const;
const languagesZodEnum = z.enum(languages);

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
  language: languagesZodEnum,
  responseFormat: responseFormatsZodEnum,
  considerations: z.array(z.string()),
  messages: z.array(messageSchema),
  additionalInstructions: z
    .string()
    .max(300, "Additional instructions cannot exceed 300 characters."),
});
export type RefactorRequestBody = z.infer<typeof refactorRequestBodySchema>;
