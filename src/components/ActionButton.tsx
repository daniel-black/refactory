import { type UseChatHelpers } from "ai/react";
import { Button, ButtonProps } from "./ui/button";
import {
  Loader2Icon,
  PauseOctagonIcon,
  RepeatIcon,
  Wand2Icon,
} from "lucide-react";

interface ActionButtonProps
  extends Pick<UseChatHelpers, "isLoading" | "stop" | "reload"> {
  hasResponse: boolean;
}

export function ActionButton({
  isLoading,
  hasResponse,
  stop,
  reload,
}: ActionButtonProps) {
  let buttonText = "Thinking...";
  let Icon = Loader2Icon;
  const buttonProps: Partial<ButtonProps> = {
    type: "button",
    disabled: true,
  };

  if (!isLoading) {
    buttonProps.disabled = false;
    if (hasResponse) {
      buttonText = "Try again";
      buttonProps.onClick = () => reload();
      Icon = RepeatIcon;
    } else {
      buttonText = "Refactor";
      Icon = Wand2Icon;
      buttonProps.type = "submit";
    }
  }

  return (
    <div className={`w-full flex gap-2`}>
      <Button className="w-full flex gap-2" {...buttonProps}>
        <Icon
          height={16}
          width={16}
          className={isLoading ? "animate-spin" : ""}
        />
        <span>{buttonText}</span>
      </Button>
      {isLoading ? <StopButton stop={stop} /> : null}
    </div>
  );
}

type StopButtonProps = Pick<ActionButtonProps, "stop">;

function StopButton(props: StopButtonProps) {
  return (
    <Button onClick={props.stop} className="flex items-center justify-center">
      <PauseOctagonIcon height={20} width={20} />
    </Button>
  );
}
