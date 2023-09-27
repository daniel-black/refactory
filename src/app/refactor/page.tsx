"use client";

import { OriginalCodeInput } from "@/components/OriginalCodeInput";
import { RefactoredCode } from "@/components/RefactoredCode";
import { useChat } from "ai/react";
import { useState } from "react";

import { LanguageComboBox, type Language } from "@/components/LanguageComboBox";
import { H2 } from "@/components/typography/H2";
import { SelectableBadge } from "@/components/SelectableBadge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ApiKeyInputModal } from "@/components/ApiKeyInputModal";

export default function RefactorPage() {
  const [language, setLanguage] = useState<Language>("typescript react");
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
  } = useChat({
    id: "chat1",
    api: "/api/refactor",
    body: {
      apiKey,
      language,
      considerations,
      additionalInstructions,
      responseFormat,
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

  return (
    <div className="p-2 gap-4 flex flex-row min-h-screen">
      {apiKey ? null : <ApiKeyInputModal setApiKey={setApiKey} />}
      <section className="w-[280px]">
        <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={isLoading || apiKey === ""}
          >
            {isLoading ? "Refactoring..." : "Refactor"}
          </Button>
        </form>
      </section>
      <main className="w-full flex gap-4">
        <OriginalCodeInput
          input={input}
          handleInputChange={handleInputChange}
        />
        <RefactoredCode
          isLoading={isLoading}
          messages={messages}
          stop={stop}
          reload={reload}
        />
      </main>
    </div>
  );
}
