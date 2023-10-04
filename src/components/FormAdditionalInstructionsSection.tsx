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
        placeholder="You can add your own refactoring instructions here"
        value={additionalInstructions}
        onChange={(e) => setAdditionalInstructions(e.target.value)}
      />
    </div>
  );
}