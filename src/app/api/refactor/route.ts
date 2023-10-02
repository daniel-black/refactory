import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getLanguageIdentifierFromName } from "@/components/LanguageComboBox";
import { z } from "zod";

import { type Message } from "ai/react";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = refactorRequestBodySchema.parse(body);

  const builtMessages = buildMessages(parsedBody);
  // console.log("\nconstructed messages: ");
  // console.log(builtMessages);
  // console.log();

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

// Not fun that we're maintaining this in two places but it's fine for now
const languages = [
  "JavaScript",
  "React",
  "TypeScript",
  "TypeScript React",
  "Other",
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
  const generic = language === "Other";
  return {
    role: "system",
    content: `You are an expert ${
      generic ? "all-around" : language
    } programmer. Please refactor the snippet of ${
      generic ? "" : language
    } code that I have provided in the next message. Your reply should ALWAYS be formatted like the example below. If the user requests that your reply contain code with comments, document the code in the "code" section with comments:
    languageIdentifier: jsx
    code:
    function Button() {
      return (<button>click me</button>);
    }`,
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
    \`\`\`${getLanguageIdentifierFromName(language)}
    ${code}
    \`\`\`

    Additionally, ${additionalInstructions}

    In your reply, please include ${responseFormat.replace("-", " ")}.
    `,
  };
}
