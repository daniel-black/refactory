import { H2 } from "./typography/H2";
import { Textarea } from "./ui/textarea";

type FormAdditionalInstructionsSectionProps = {
  additionalInstructions: string;
  setAdditionalInstructions: React.Dispatch<React.SetStateAction<string>>;
};

export function FormAdditionalInstructionsSection({
  additionalInstructions,
  setAdditionalInstructions,
}: FormAdditionalInstructionsSectionProps) {
  return (
    <div className="space-y-2">
      <H2>Additional Instructions</H2>
      <Textarea
        placeholder="Ex: use arrow functions"
        value={additionalInstructions}
        onChange={(e) => setAdditionalInstructions(e.target.value)}
        className="max-h-[33vh]"
        spellCheck={false}
      />
    </div>
  );
}
