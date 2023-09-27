"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { SaveIcon } from "lucide-react";

type ApiKeyInputModalProps = {
  setApiKey: (value: string | ((val: string) => string)) => void;
};

export function ApiKeyInputModal({ setApiKey }: ApiKeyInputModalProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiKey(value);
  }

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add your OpenAI API Key</AlertDialogTitle>
          <AlertDialogDescription>
            Since I do not have unlimited resources (a shame, honestly), I need
            you to bring your own API key to purchase the intelligence that will
            refactor your React components.
            <br />
            <br />
            Your API key will only ever be stored in local storage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form onSubmit={handleSubmit} className="w-full flex items-end gap-2">
            <div className="space-y-1 w-full">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                type="text"
                value={value}
                name="api-key"
                id="api-key"
                onChange={(e) => setValue(e.target.value)}
                className="w-full"
                spellCheck="false"
                required
              />
            </div>
            <Button type="submit" className="flex gap-2">
              <SaveIcon height={18} width={18} />
              <span>Save</span>
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
