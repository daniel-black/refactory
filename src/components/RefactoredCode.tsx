import { H2 } from "./typography/H2";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { PauseOctagonIcon } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

import { type UseChatHelpers } from "ai/react";
import {
  getCodeFromMarkdown,
  getLanguageIdentifierFromMarkdown,
} from "@/utils/languages";

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

  let languageIdentifier = "javascript";
  let text = "// Refactored code will be displayed here...";

  if (refactorMessage) {
    console.log(refactorMessage.content);
    const { content } = refactorMessage;

    languageIdentifier = getLanguageIdentifierFromMarkdown(content);
    text = getCodeFromMarkdown(content);
  }

  return (
    <section className="flex-1 border rounded-md bg-[rgb(250,250,250)]">
      <CodeBlock languageIdentifier={languageIdentifier} text={text} />
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
