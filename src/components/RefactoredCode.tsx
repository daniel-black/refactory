import { Textarea } from "./ui/textarea";
import { H2 } from "./typography/H2";

import { type UseChatHelpers } from "ai/react";
import { Button } from "./ui/button";

type RefactoredCodeProps = Pick<
  UseChatHelpers,
  "isLoading" | "messages" | "stop" | "reload"
>;

export function RefactoredCode({
  isLoading,
  messages,
  stop,
  reload,
}: RefactoredCodeProps) {
  const refactorMessage = messages.find((m) => m.role === "assistant");

  return (
    <section className="flex-1 flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <H2>Refactored code</H2>
        <div>
          {isLoading ? <Button onClick={stop}>stop</Button> : null}
          {refactorMessage && !isLoading ? (
            <Button onClick={() => reload()}>retry</Button>
          ) : null}
        </div>
      </div>
      <Textarea
        value={refactorMessage ? refactorMessage.content : ""}
        placeholder="Refactored code will be displayed here..."
        className="h-full resize-none font-mono"
        readOnly
      />
    </section>
  );
}
