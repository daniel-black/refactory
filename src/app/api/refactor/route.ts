import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { refactorRequestBodySchema } from "@/schemas/api/refactor";
import { buildMessages } from "@/utils/messages";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = refactorRequestBodySchema.parse(body);

  const builtMessages = buildMessages(parsedBody);

  const openai = new OpenAI({
    apiKey: body.apiKey,
  });

  const response = await openai.chat.completions.create({
    model: parsedBody.model,
    stream: true,
    messages: builtMessages,
    temperature: 0.8,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
