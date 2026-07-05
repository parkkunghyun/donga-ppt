import { MultilineText } from "./multiline-text";

interface AsIsToBeBoxProps {
  asIs: string;
  toBe: string;
}

export function AsIsToBeBox({ asIs, toBe }: AsIsToBeBoxProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl bg-surface p-6">
        <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-muted">
          AS-IS
        </p>
        <MultilineText className="text-[14px] leading-relaxed text-text">
          {asIs}
        </MultilineText>
      </div>
      <div className="rounded-xl bg-main p-6">
        <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-white/60">
          TO-BE
        </p>
        <MultilineText className="text-[14px] leading-relaxed text-white">
          {toBe}
        </MultilineText>
      </div>
    </div>
  );
}
