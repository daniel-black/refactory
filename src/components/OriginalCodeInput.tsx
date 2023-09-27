import { Textarea } from "./ui/textarea";
import { H2 } from "./typography/H2";

import { type UseChatHelpers } from "ai/react";

type OriginalCodeInputProps = Pick<
  UseChatHelpers,
  "input" | "handleInputChange"
>;

export function OriginalCodeInput({
  input,
  handleInputChange,
}: OriginalCodeInputProps) {
  return (
    <section className="flex-1 flex flex-col space-y-2">
      <H2>Original code</H2>
      <Textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Paste your code here..."
        className="h-full resize-none font-mono"
      />
    </section>
  );
}
