"use client";

import { RefactoredCode } from "@/components/RefactoredCode";
import { useChat } from "ai/react";
import { FormEvent, useState } from "react";

import { LanguageComboBox } from "@/components/LanguageComboBox";
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
import {
  type LanguageIdentifier,
  getLanguageNameFromIdentifier,
} from "@/utils/languages";

const considerationsList = [
  "readable", // Readability often directly translates to maintainability.
  "maintainable", // Maintainable code can easily be expanded, updated or debugged.
  "efficient", // Efficiency ensures that the code runs with minimal wasted resources.
  "testable", // Testable code is crucial for identifying and fixing bugs early.
  "modular", // Modularity simplifies understanding and development of the code.
  "secure", // Security is vital for protecting data and system integrity.
  "robust", // Robust code can handle unexpected inputs or situations without breaking.
  "reusable", // Reusability reduces duplication and increases code clarity.
  "documented", // Documentation helps developers understand the purpose and function of code.
  "concise", // Conciseness makes the code easier to read and understand.
  "extendable", // Extensibility makes it easy to add new features or capabilities.
  "functional", // Functional programming can lead to less bugs and more predictable code.
  "optimized", // Optimization ensures that the code performs its best for its intended use case.
  "idiomatic", // Following language idioms helps others understand your code.
  "configurable", // Configurability allows easy adjustment to different situations.
  "accessible", // Accessibility ensures the software can be used by as many people as possible.
  "decoupled", // Decoupling makes each part of the code more independent and easier to manage.
  "abstracted", // Abstraction hides complexity and makes the code easier to reason about.
  "immutable", // Immutability can help make the code safer and easier to reason about.
  "parallelizable", // Parallelizability could be useful for performance but is not always needed.
];

export default function RefactorPage() {
  const [language, setLanguage] = useState<LanguageIdentifier>("javascript");
  const [considerations, setConsiderations] = useState<string[]>([]);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [responseFormat, setResponseFormat] = useState("code-only");
  const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");

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
      apiKey,
      considerations,
      responseFormat,
      additionalInstructions,
      language: getLanguageNameFromIdentifier(language),
    },
  });

  console.log(messages);
  console.log(input);

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
    setInput("");
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
              {considerationsList.map((consideration) => (
                <SelectableBadge
                  key={consideration}
                  label={consideration}
                  selected={considerations.includes(consideration)}
                  onClick={onBadgeClick}
                />
              ))}
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
