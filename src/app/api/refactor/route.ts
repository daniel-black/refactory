import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { z } from "zod";

import { type Message } from "ai/react";

export const runtime = "edge";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "",
// });

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = refactorRequestBodySchema.parse(body);

  const builtMessages = buildMessages(parsedBody);
  console.log("\nconstructed messages: ");
  console.log(builtMessages);
  console.log();

  const openai = new OpenAI({
    apiKey: body.apiKey,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // model: "gpt-4",
    stream: true,
    messages: builtMessages,
    temperature: 0.8,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

const responseFormats = ["code-only", "code-with-comments"] as const;
const responseFormatsZodEnum = z.enum(responseFormats);
type ResponseFormat = z.infer<typeof responseFormatsZodEnum>;

const languages = [
  "javascript",
  "react",
  "typescript",
  "typescript react",
  "other",
] as const;
const languagesZodEnum = z.enum(languages);
type Language = z.infer<typeof languagesZodEnum>;

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

const refactorRequestBodySchema = z.object({
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

function buildMessages(body: RefactorRequestBody) {
  const systemMessage = buildSystemMessage(body.language);
  const userMessage = buildUserMessage(
    body.language,
    body.responseFormat,
    body.considerations,
    body.additionalInstructions,
    body.messages[0]!.content
  );

  return [systemMessage, userMessage];
}

type MessageWithoutId = Pick<Message, "role" | "content">;

function buildSystemMessage(language: Language): MessageWithoutId {
  const generic = language === "other";
  return {
    role: "system",
    content: `You are an expert ${
      generic ? "all-around" : language
    } programmer. Please refactor the snippet of ${
      generic ? "" : language
    } code that I have provided in the next message. Your reply should ALWAYS ONLY contain the refactored code within a markdown fenced code block with the language specified like:
    \`\`\`javascript
    alert("hi");
    \`\`\``,
  };
}

function buildUserMessage(
  language: Language,
  responseFormat: ResponseFormat,
  considerations: string[],
  additionalInstructions: string,
  code: string
): MessageWithoutId {
  const listFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });
  return {
    role: "user",
    content: `Please refactor and improve the following code${
      considerations.length > 0
        ? " so that it is " + listFormatter.format(considerations)
        : ""
    }.
    \`\`\`${language}
    ${code}
    \`\`\`

    Additionally, ${additionalInstructions}

    In your markdown fenced code block reply, please include ${responseFormat.replace(
      "-",
      " "
    )}.
    `,
  };
}
