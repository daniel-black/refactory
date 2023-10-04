import type { Message } from "ai/react";
import type {
  ResponseFormat,
  RefactorRequestBody,
} from "@/schemas/api/refactor";
import { LanguageName, getLanguageIdentifierFromName } from "./languages";

const listFormatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

export function buildMessages(body: RefactorRequestBody) {
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

function buildSystemMessage(language: LanguageName): MessageWithoutId {
  const generic = language === "Other";
  return {
    role: "system",
    content: `You are an expert ${
      generic ? "all-around" : language
    } programmer. You think logically and can do anything.`,
  };
}

function buildUserMessage(
  language: LanguageName,
  responseFormat: ResponseFormat,
  considerations: string[],
  additionalInstructions: string,
  code: string
): MessageWithoutId {
  return {
    role: "user",
    content: `Please refactor and improve the following ${language} code ${formatConsiderations(
      considerations
    )}.
    code to be refactored:
    ${code}

    Additionally, ${additionalInstructions}
    
    In your reply, please include ${responseFormat.replace("-", " ")}.

    Your reply should ALWAYS be formatted EXACTLY like the example below. If you need to include an explanation of the refactored code, put it inside of a multiline code comment after the refactored code. Be extremely concise and to the point in your explanation of the refactored code if you include one. DO NOT include an explanation of the original code.
    
    Example reply:
    {your refactored code goes here}

    /*
    Explanation:
    - explanation 1
    - explanation 2
    */
    `,
  };
}

function formatConsiderations(considerations: string[]) {
  return considerations.length > 0
    ? "so that it is " + listFormatter.format(considerations)
    : "";
}
