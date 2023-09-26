"use client";

import { useChat } from "ai/react";
import { Textarea } from "./ui/textarea";
import { H2 } from "./typography/H2";

export function RefactoredCode() {
  const { isLoading, messages } = useChat({
    id: "chat1",
    api: "/api/refactor",
  });

  const refactorMessage = messages.find((m) => m.role === "assistant");

  return (
    <section className="flex-1 flex flex-col space-y-2">
      <H2>Refactored code</H2>
      <Textarea
        value={refactorMessage ? refactorMessage.content : ""}
        placeholder="Refactored code will be displayed here..."
        className="h-full resize-none"
        readOnly
      />
    </section>
  );
}
