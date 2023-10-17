"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { SparklesIcon, ZapIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const models = ["gpt-3.5-turbo", "gpt-4"] as const;

export type Model = (typeof models)[number];

export function ModelToggle() {
  const [model, setModel] = useLocalStorage<Model>("model", "gpt-3.5-turbo");
  const Icon = model === "gpt-4" ? SparklesIcon : ZapIcon;

  function handleModelSelect(ownModel: Model) {
    if (ownModel !== model) {
      setModel(ownModel);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon className="h-4 w-4" />
          <span className="sr-only">Toggle model</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {models.map((m) => (
          <DropdownMenuItem key={m} onClick={() => handleModelSelect(m)}>
            {m}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
