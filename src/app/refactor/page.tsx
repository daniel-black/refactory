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
import { type Model, ModelSelect } from "@/components/ModelSelect";
import { EditorSkeleton } from "@/components/EditorSkeleton";
import { SubmitButton } from "@/components/SubmitButton";
import { FormLanguageSection } from "@/components/FormLanguageSection";
import { FormConsiderationsSection } from "@/components/FormConsiderationsSection";
import { FormAdditionalInstructionsSection } from "@/components/FormAdditionalInstructionsSection";
import { RetryButton } from "@/components/RetryButton";
import { StopButton } from "@/components/StopButton";

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

  const refactoredMessage = messages?.find((m) => m.role === "assistant");

  function reset() {
    setInput("");
    setMessages([]);
    setConsiderations([]);
    setAdditionalInstructions("");
    setLanguage("javascript");
  }

  return (
    <div className="gap-2 flex flex-row min-h-screen">
      {apiKey ? null : <ApiKeyInputModal setApiKey={setApiKey} />}
      <section className="w-[280px] space-y-2 p-2">
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <FormLanguageSection language={language} setLanguage={setLanguage} />
          <FormConsiderationsSection
            considerations={considerations}
            setConsiderations={setConsiderations}
          />
          <FormAdditionalInstructionsSection
            additionalInstructions={additionalInstructions}
            setAdditionalInstructions={setAdditionalInstructions}
          />
          {refactoredMessage && !isLoading ? (
            <RetryButton reload={reload} />
          ) : (
            <div className="flex">
              <SubmitButton isLoading={isLoading} />
              {isLoading && <StopButton stop={stop} />}
            </div>
          )}
        </form>
        {/* <Button variant={"secondary"} className="w-full" onClick={reset}>
          Reset
        </Button>
        <ModelSelect /> */}
      </section>
      <main className="w-full flex flex-col sm:flex-row gap-2">
        <CodePanel>
          <H2>Original Code</H2>
          <Editor
            language={language}
            loading={<EditorSkeleton />}
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
              lineNumbersMinChars: 3,
              scrollBeyondLastLine: false,
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
              lineNumbersMinChars: 3,
              scrollBeyondLastLine: false,
            }}
          />
        </CodePanel>
      </main>
    </div>
  );
}
