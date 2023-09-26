"use client";

import { useChat } from "ai/react";
import { Textarea } from "./ui/textarea";
import { H2 } from "./typography/H2";

export function OriginalCodeInput() {
  const { input, handleInputChange } = useChat({
    id: "chat1",
    api: "/api/refactor",
  });

  return (
    <section className="flex-1 flex flex-col space-y-2">
      <H2>Original code</H2>
      <Textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Paste your code here..."
        className="h-full resize-none"
      />
    </section>
  );
}
