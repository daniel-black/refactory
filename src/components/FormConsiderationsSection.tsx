import { SelectableBadge } from "./SelectableBadge";
import { H2 } from "./typography/H2";

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
] as const;

type FormConsiderationsSectionProps = {
  considerations: string[];
  setConsiderations: React.Dispatch<React.SetStateAction<string[]>>;
};

export function FormConsiderationsSection({
  considerations,
  setConsiderations,
}: FormConsiderationsSectionProps) {
  function handleBadgeClick(consideration: string) {
    setConsiderations((prevConsiderations) => {
      if (prevConsiderations.includes(consideration)) {
        return prevConsiderations.filter((c) => c !== consideration);
      } else {
        return [...prevConsiderations, consideration];
      }
    });
  }

  return (
    <div className="space-y-2">
      <H2>Considerations</H2>
      <div className="flex flex-wrap gap-1">
        {considerationsList.map((consideration) => (
          <SelectableBadge
            key={consideration}
            label={consideration}
            selected={considerations.includes(consideration)}
            onClick={handleBadgeClick}
          />
        ))}
      </div>
    </div>
  );
}
