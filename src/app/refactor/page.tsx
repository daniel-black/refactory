import { OriginalCodeInput } from "@/components/OriginalCodeInput";
import { RefactoredCode } from "@/components/RefactoredCode";
import { RefactorForm } from "@/components/RefactorForm";

export default function RefactorPage() {
  return (
    <div className="p-2 gap-4 flex flex-row min-h-screen">
      <RefactorForm />
      <main className="w-full flex gap-4">
        <OriginalCodeInput />
        <RefactoredCode />
      </main>
    </div>
  );
}
