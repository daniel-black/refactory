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
import {
  languages,
  getLanguageNameFromIdentifier,
  type LanguageIdentifier,
} from "@/utils/languages";

type LanguageComboBoxProps = {
  selectedLanguage: LanguageIdentifier;
  setSelectedLanguage: (language: LanguageIdentifier) => void;
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
          {getLanguageNameFromIdentifier(selectedLanguage)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandEmpty>No languages found.</CommandEmpty>
          <CommandGroup>
            {languages.map(({ identifier, name }) => (
              <CommandItem
                key={identifier}
                onSelect={() => {
                  setSelectedLanguage(identifier);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedLanguage === identifier
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
