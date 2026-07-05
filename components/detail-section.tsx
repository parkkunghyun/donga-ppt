interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-[20px] font-bold text-main">{title}</h2>
      <div className="rounded-xl border border-border bg-bg p-6">
        {children}
      </div>
    </section>
  );
}
