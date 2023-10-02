import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeSyntaxHighlighterProps = {
  className: string | undefined;
  code: React.ReactNode;
};

export function CodeSyntaxHighlighter({
  className,
  code,
}: CodeSyntaxHighlighterProps) {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      children={String(code).replace(/\n$/, "")}
      language={match[1]}
      customStyle={{
        marginTop: 0,
        marginBottom: 0,
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
        fontSize: "0.875rem",
      }}
      style={oneLight}
    />
  ) : (
    <code className={className}>{code}</code>
  );
}
