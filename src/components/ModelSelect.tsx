import { SparklesIcon, ZapIcon } from "lucide-react";
import { Button } from "./ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";

const models = [
  { id: "gpt-3.5-turbo", name: "GPT-3.5", icon: ZapIcon },
  { id: "gpt-4", name: "GPT-4", icon: SparklesIcon },
];

export type Model = (typeof models)[number]["id"];

export function ModelSelect() {
  const [model, setModel] = useLocalStorage<Model>("model", "gpt-3.5-turbo");

  // const isGpt4 = model === "gpt-4";
  const iconClasses = "h-4 w-4";

  function handleModelSelect(ownModel: Model) {
    if (ownModel !== model) {
      setModel(ownModel);
    }
  }

  return (
    <div className="w-full flex gap-1 p-1 rounded-lg bg-secondary-foreground">
      {models.map((modelItem) => {
        const Icon = modelItem.icon;
        const isSelected = model === modelItem.id;
        return (
          <Button
            key={modelItem.id}
            variant="secondary"
            className={`flex-1 flex gap-1.5 ${
              isSelected ? "bg-indigo-300" : ""
            }`}
            onClick={() => handleModelSelect(modelItem.id)}
          >
            <Icon className={iconClasses} />
            <span className="whitespace-nowrap">{modelItem.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
