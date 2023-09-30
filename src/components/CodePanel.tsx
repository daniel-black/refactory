export function CodePanel({ children }: { children: React.ReactNode }) {
  console.log(children);
  return (
    <section className="h-screen p-2 space-y-2 flex-1 flex flex-col">
      {children}
    </section>
  );
}
