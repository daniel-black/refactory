import { UseChatHelpers } from "ai/react";
import { Button } from "./ui/button";
import { PauseOctagonIcon } from "lucide-react";

type StopButtonProps = Pick<UseChatHelpers, "stop">;

export function StopButton({ stop }: StopButtonProps) {
  return (
    <Button
      className="w-fit select-none"
      type="button"
      variant="destructive"
      onClick={stop}
    >
      <PauseOctagonIcon height={20} width={20} />
    </Button>
  );
}
