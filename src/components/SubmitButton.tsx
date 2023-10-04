import { Button } from "./ui/button";
import { Loader2Icon, Wand2Icon } from "lucide-react";

type SubmitButtonProps = {
  isLoading: boolean;
};

export function SubmitButton({ isLoading }: SubmitButtonProps) {
  const [Icon, text] = isLoading
    ? [Loader2Icon, "Thinking..."]
    : [Wand2Icon, "Refactor"];

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full select-none flex gap-2"
      disabled={isLoading}
    >
      <Icon
        height={16}
        width={16}
        className={isLoading ? "animate-spin" : ""}
      />
      <span>{text}</span>
    </Button>
  );
}
