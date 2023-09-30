"use client";

import { Textarea } from "./ui/textarea";
import { CodeBlock } from "./CodeBlock";
import { type UseChatHelpers } from "ai/react";

type OriginalCodeInputProps = Pick<
  UseChatHelpers,
  "input" | "handleInputChange"
>;

// Some hacky shit:
// A Textarea sitting above a syntax highlighting code block. The text of the
// Textarea is transparent (the cursor and selections are not) so that the
// syntax highlighted code beneath it can shine through. The styles of the
// Textarea and the CodeBlock are matched up as close as can be so that the
// cursor appears to behave like the user would expect.
export function OriginalCodeInput({
  input,
  handleInputChange,
}: OriginalCodeInputProps) {
  return (
    <section className="flex-1 relative border rounded-md bg-[rgb(250,250,250)]">
      <Textarea
        className={`absolute font-mono bg-transparent z-10 text-transparent selection:bg-slate-500 selection:bg-opacity-40 caret-black h-full resize-none border-none `}
        onChange={handleInputChange}
        spellCheck={false}
        // placeholder="// Enter your code here..."
      />
      <CodeBlock languageIdentifier="javascript" text={input} />
    </section>
  );
}
