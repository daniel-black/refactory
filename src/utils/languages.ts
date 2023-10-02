export const languages = [
  { name: "JavaScript", identifier: "javascript" },
  { name: "React", identifier: "jsx" },
  { name: "TypeScript", identifier: "typescript" },
  { name: "TypeScript React", identifier: "tsx" },
  { name: "Python", identifier: "python" },
  { name: "Java", identifier: "java" },
  { name: "C#", identifier: "csharp" },
  { name: "C++", identifier: "cpp" },
  { name: "C", identifier: "c" },
  { name: "Go", identifier: "go" },
  { name: "PHP", identifier: "php" },
  { name: "Rust", identifier: "rust" },
  { name: "Swift", identifier: "swift" },
  { name: "Ruby", identifier: "ruby" },
  { name: "Kotlin", identifier: "kotlin" },
  { name: "Scala", identifier: "Scala" },
  { name: "Lisp", identifier: "lisp" },
  { name: "Clojure", identifier: "clojure" },
  { name: "Julia", identifier: "julia" },
  { name: "Other", identifier: "other" },
] as const;

export type LanguageName = (typeof languages)[number]["name"];
export type LanguageIdentifier = (typeof languages)[number]["identifier"];

export function getLanguageNameFromIdentifier(
  languageIdentifier: LanguageIdentifier
) {
  return languages.find(
    (language) => language.identifier === languageIdentifier
  )?.name;
}

export function getLanguageIdentifierFromName(languageName: LanguageName) {
  return languages.find((language) => language.name === languageName)
    ?.identifier;
}

export function getLanguageIdentifierFromMarkdown(markdown: string) {
  const startIndex = markdown.indexOf("```") + 3;
  const endIndex = markdown.indexOf("\n", startIndex);
  const languageIdentifier = markdown.substring(startIndex, endIndex);

  return languageIdentifier;
}

export function getCodeFromMarkdown(markdown: string) {
  const splitMarkdown = markdown.split("\n");
  const codeLines = splitMarkdown.slice(1, -1);
  const codeContent = codeLines.join("\n");

  return codeContent;
}