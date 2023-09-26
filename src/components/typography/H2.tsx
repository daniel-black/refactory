export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-xl text-foreground font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
}
