interface MultilineTextProps {
  children: string;
  className?: string;
}

export function MultilineText({ children, className = "" }: MultilineTextProps) {
  return (
    <p className={`whitespace-pre-line ${className}`.trim()}>{children}</p>
  );
}
