import { UseChatHelpers } from "ai/react";
import { Button } from "./ui/button";
import { RepeatIcon } from "lucide-react";

type RetryButtonProps = Pick<UseChatHelpers, "reload">;

export function RetryButton({ reload }: RetryButtonProps) {
  return (
    <Button
      className="w-full select-none flex gap-2"
      type="button"
      onClick={() => reload()}
    >
      <RepeatIcon height={16} width={16} />
      <span>Retry</span>
    </Button>
  );
}
