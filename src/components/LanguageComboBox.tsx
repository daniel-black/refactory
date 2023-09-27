"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "TypeScript React", value: "typescript react" },
  { label: "Other", value: "other" },
] as const;

export type Language = (typeof languages)[number]["value"];

type LanguageComboBoxProps = {
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
};

export function LanguageComboBox({
  selectedLanguage,
  setSelectedLanguage,
}: LanguageComboBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLanguage
            ? languages.find((language) => language.value === selectedLanguage)
                ?.label
            : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandEmpty>No languages found.</CommandEmpty>
          <CommandGroup>
            {languages.map((language) => (
              <CommandItem
                key={language.value}
                onSelect={(currentLanguageString) => {
                  const currentLanguage = currentLanguageString as Language;
                  setSelectedLanguage(
                    currentLanguage === selectedLanguage
                      ? "other"
                      : currentLanguage
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedLanguage === language.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
