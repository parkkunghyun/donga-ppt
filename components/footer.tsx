interface FooterProps {
  text: string;
}

export function Footer({ text }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-[#F8F8F8]">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <p className="text-[14px] text-[#231F20]">{text}</p>
      </div>
    </footer>
  );
}
