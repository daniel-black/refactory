import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeSyntaxHighlighterProps = {
  className: string | undefined;
  children: React.ReactNode;
};

export function CodeSyntaxHighlighter({
  className,
  children,
}: CodeSyntaxHighlighterProps) {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, "")}
      language={match[1]}
      customStyle={{
        marginTop: 0,
        marginBottom: 0,
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
      }}
      style={oneLight}
    />
  ) : (
    <code className={className}>{children}</code>
  );
}