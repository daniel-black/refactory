export const languages = [
  { name: "JavaScript", identifier: "javascript" },
  { name: "TypeScript", identifier: "typescript" },
  { name: "Python", identifier: "python" },
  { name: "JSX", identifier: "jsx" },
  { name: "TSX", identifier: "tsx" },
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
