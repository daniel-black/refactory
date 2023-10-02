import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeSyntaxHighlighterProps = {
  className: string | undefined;
  code: React.ReactNode;
};

// CSS styles applied to pre component:
// background: rgb(250, 250, 250);
// color: rgb(56, 58, 66);
// font-family: "Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace;
// direction: ltr;
// text-align: left;
// white-space: pre;
// word-spacing: normal;
// word-break: normal;
// line-height: 1.5;
// tab-size: 2;
// hyphens: none;
// padding: 0.5rem 0.75rem;
// margin: 0px;
// overflow: auto;
// border-radius: 0.3em;
// font-size: 0.875rem;

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
        maxWidth: "100%",
        marginTop: 0,
        marginBottom: 0,
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
        overflowX: "auto",
        fontSize: "0.875rem",
      }}
      style={oneLight}
    />
  ) : (
    <code className={className}>{code}</code>
  );
}
