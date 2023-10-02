import ReactMarkdown from "react-markdown";
import { CodeSyntaxHighlighter } from "./CodeSyntaxHighlighter";

// Takes language identifier (like jsx or cpp) and raw code text as inputs
type CodeBlockProps = {
  // https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/699056430175e7a09668f85b8ccad9f18b186066/AVAILABLE_LANGUAGES_PRISM.MD?plain=1#L116
  languageIdentifier: string;
  text: string;
};

export function CodeBlock({ languageIdentifier, text }: CodeBlockProps) {
  const markdown = `\`\`\`${languageIdentifier}\n${text}\n\`\`\``;
  return (
    <ReactMarkdown
      children={markdown}
      className={
        "flex-1 text-sm rounded-md absolute bg-[rgb(250,250,250)] whitespace-pre leading-normal break-normal hyphens-none"
      }
      components={{
        code({ className, children }) {
          return (
            <CodeSyntaxHighlighter className={className} code={children} />
          );
        },
      }}
    />
  );
}
