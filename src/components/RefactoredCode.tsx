import { Textarea } from "./ui/textarea";
import { H2 } from "./typography/H2";

import { type UseChatHelpers } from "ai/react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { PauseOctagonIcon } from "lucide-react";

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
          {isLoading ? <StopButton stop={stop} /> : null}
          {refactorMessage && !isLoading ? (
            <RetryButton reload={reload} />
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

type StopButtonProps = Pick<UseChatHelpers, "stop">;

function StopButton(props: StopButtonProps) {
  return (
    <Button
      className={cn(
        "flex items-center gap-1.5",
        buttonVariants({ variant: "destructive" })
      )}
      onClick={props.stop}
    >
      <PauseOctagonIcon height={16} width={16} />
      <span>Stop</span>
    </Button>
  );
}

type RetryButtonProps = Pick<UseChatHelpers, "reload">;

function RetryButton(props: RetryButtonProps) {
  return (
    <Button
      className={cn(
        "flex items-center gap-1.5",
        buttonVariants({ variant: "secondary" })
      )}
      onClick={() => props.reload()}
    >
      <PauseOctagonIcon height={16} width={16} />
      <span>Retry</span>
    </Button>
  );
}
