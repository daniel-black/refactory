"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { H2 } from "@/components/typography/H2";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ApiKeyInputModal } from "@/components/ApiKeyInputModal";
import { CodePanel } from "@/components/CodePanel";
import {
  type LanguageIdentifier,
  getLanguageNameFromIdentifier,
} from "@/utils/languages";
import { EditorSkeleton } from "@/components/EditorSkeleton";
import { FormLanguageSection } from "@/components/FormLanguageSection";
import { FormConsiderationsSection } from "@/components/FormConsiderationsSection";
import { FormAdditionalInstructionsSection } from "@/components/FormAdditionalInstructionsSection";
import { ActionButton } from "@/components/ActionButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { Model, ModelToggle } from "@/components/ModelToggle";
import { EraserIcon } from "lucide-react";

export default function RefactorPage() {
  const [language, setLanguage] = useState<LanguageIdentifier>("javascript");
  const [considerations, setConsiderations] = useState<string[]>([]);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");
  const [model] = useLocalStorage<Model>("model", "gpt-3.5-turbo");

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    stop,
    reload,
    setMessages,
  } = useChat({
    api: "/api/refactor",
    body: {
      model,
      apiKey,
      considerations,
      additionalInstructions,
      language: getLanguageNameFromIdentifier(language),
    },
  });
  // use the theme to set the editor themes
  const { resolvedTheme } = useTheme();
  const editorTheme = resolvedTheme === "light" ? "light" : "vs-dark";

  const refactoredMessage = messages?.find((m) => m.role === "assistant");

  function reset() {
    setInput("");
    setMessages([]);
    setConsiderations([]);
    setAdditionalInstructions("");
    setLanguage("javascript");
  }

  return (
    <div className="gap-2 flex flex-row h-screen w-screen">
      {apiKey ? null : <ApiKeyInputModal setApiKey={setApiKey} />}
      <section className="w-[280px] space-y-2 p-2 flex flex-col justify-between">
        <div className="space-y-2">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <FormLanguageSection
              language={language}
              setLanguage={setLanguage}
            />
            <FormConsiderationsSection
              considerations={considerations}
              setConsiderations={setConsiderations}
            />
            <FormAdditionalInstructionsSection
              additionalInstructions={additionalInstructions}
              setAdditionalInstructions={setAdditionalInstructions}
            />
            <ActionButton
              isLoading={isLoading}
              hasResponse={!!refactoredMessage}
              reload={reload}
              stop={stop}
            />
          </form>
          {refactoredMessage && !isLoading ? (
            <Button
              variant={"secondary"}
              className="w-full flex gap-1.5 "
              onClick={reset}
            >
              <EraserIcon className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          ) : null}
        </div>
        <div className="flex gap-1.5">
          <ThemeToggle />
          <ModelToggle />
        </div>
      </section>
      <main className="w-full flex flex-col sm:flex-row gap-2">
        <CodePanel>
          <H2>Original Code</H2>
          <Editor
            language={language}
            loading={<EditorSkeleton />}
            value={messages.length > 0 ? messages[0].content : input}
            onChange={(v) => {
              if (v) {
                setInput(v);
              }
            }}
            options={{
              minimap: {
                enabled: false,
              },
              tabSize: 2,
              padding: {
                top: 10,
                bottom: 10,
              },
              lineNumbersMinChars: 3,
              scrollBeyondLastLine: false,
              theme: editorTheme,
            }}
          />
        </CodePanel>
        <CodePanel>
          <H2>Refactored Code</H2>
          <Editor
            language={language}
            loading={<EditorSkeleton />}
            value={
              refactoredMessage?.content ?? "// Try refactoring some code :)"
            }
            options={{
              readOnly: true,
              minimap: {
                enabled: false,
              },
              tabSize: 2,
              padding: {
                top: 10,
                bottom: 10,
              },
              lineNumbersMinChars: 3,
              scrollBeyondLastLine: false,
              theme: editorTheme,
            }}
          />
        </CodePanel>
      </main>
    </div>
  );
}
