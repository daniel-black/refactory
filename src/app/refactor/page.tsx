"use client";

import { RefactoredCode } from "@/components/RefactoredCode";
import { useChat } from "ai/react";
import { FormEvent, useState } from "react";

import {
  LanguageComboBox,
  getLanguageNameFromIdentifier,
  type LanguageIdentifier,
} from "@/components/LanguageComboBox";
import { H2 } from "@/components/typography/H2";
import { SelectableBadge } from "@/components/SelectableBadge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ApiKeyInputModal } from "@/components/ApiKeyInputModal";
import { OriginalCodeInput } from "@/components/OriginalCodeInput";
import { CodePanel } from "@/components/CodePanel";

export default function RefactorPage() {
  const [language, setLanguage] = useState<LanguageIdentifier>("javascript");
  const [considerations, setConsiderations] = useState<string[]>([]);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [responseFormat, setResponseFormat] = useState("code-only");
  const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    stop,
    reload,
    setMessages,
  } = useChat({
    id: "chat1",
    api: "/api/refactor",
    body: {
      apiKey,
      considerations,
      responseFormat,
      additionalInstructions,
      language: getLanguageNameFromIdentifier(language),
    },
  });

  function onBadgeClick(consideration: string) {
    if (considerations.includes(consideration)) {
      // remove if already in the list
      setConsiderations((considerations) =>
        considerations.filter((c) => c != consideration)
      );
    } else {
      // add to list if not already present
      setConsiderations((considerations) => [...considerations, consideration]);
    }
  }

  function reset() {
    setMessages([]);
    setConsiderations([]);
    setAdditionalInstructions("");
    setLanguage("javascript");
    setResponseFormat("code-only");
  }

  return (
    <div className="gap-2 flex flex-row min-h-screen">
      {apiKey ? null : <ApiKeyInputModal setApiKey={setApiKey} />}
      <section className="w-[280px] space-y-2 p-2">
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            handleSubmit(e);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <H2>Programming&nbsp;language</H2>
            <LanguageComboBox
              selectedLanguage={language}
              setSelectedLanguage={setLanguage}
            />
          </div>
          <div className="space-y-2">
            <H2>Considerations</H2>
            <div className="flex flex-wrap gap-1">
              <SelectableBadge
                label="readable"
                selected={considerations.includes("readable")}
                onClick={onBadgeClick}
              />
              <SelectableBadge
                label="performant"
                selected={considerations.includes("performant")}
                onClick={onBadgeClick}
              />
              <SelectableBadge
                label="concise"
                selected={considerations.includes("concise")}
                onClick={onBadgeClick}
              />

              <SelectableBadge
                label="functional"
                selected={considerations.includes("functional")}
                onClick={onBadgeClick}
              />
              <SelectableBadge
                label="modular"
                selected={considerations.includes("modular")}
                onClick={onBadgeClick}
              />
              <SelectableBadge
                label="use arrow functions"
                selected={considerations.includes("use arrow functions")}
                onClick={onBadgeClick}
              />
            </div>
          </div>
          <div className="space-y-2">
            <H2>Additional Instructions</H2>
            <Textarea
              placeholder="You can add your own refactoring instructions here"
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <H2>Response Format</H2>
            <RadioGroup
              value={responseFormat}
              onValueChange={setResponseFormat}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="code-only" id="r1" />
                <Label htmlFor="r1">code only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="code-with-comments" id="r2" />
                <Label htmlFor="r2">code with comments</Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full select-none"
            disabled={isLoading}
          >
            {isLoading ? "Refactoring..." : "Refactor"}
          </Button>
        </form>
        <Button variant={"secondary"} className="w-full" onClick={reset}>
          Reset
        </Button>
      </section>
      <main className="w-full flex gap-2">
        <CodePanel>
          <H2>Original Code</H2>
          <OriginalCodeInput
            input={messages.length > 0 ? messages[0].content : input}
            handleInputChange={handleInputChange}
          />
        </CodePanel>
        <CodePanel>
          <H2>Refactored Code</H2>
          <RefactoredCode
            isLoading={isLoading}
            messages={messages}
            stop={stop}
            reload={reload}
          />
        </CodePanel>
      </main>
    </div>
  );
}
