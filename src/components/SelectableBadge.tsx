import { PlusIcon, XIcon } from "lucide-react";

type SelectableBadgeProps = {
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
};

export function SelectableBadge({
  label,
  selected,
  onClick,
}: SelectableBadgeProps) {
  const iconClasses = "h-3 w-3";
  return (
    <div
      onClick={() => onClick(label)}
      className={`inline-flex items-center space-x-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer select-none ${
        selected
          ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
          : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      <span>{label}</span>
      {selected ? (
        <XIcon className={iconClasses} />
      ) : (
        <PlusIcon className={iconClasses} />
      )}
    </div>
  );
}
