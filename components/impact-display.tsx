import { formatImpactHours } from "@/lib/format-impact";
import { CountUp } from "./count-up";

interface ImpactDisplayProps {
  value: number;
  label: string;
  size?: "card" | "detail";
}

export function ImpactDisplay({ value, label, size = "detail" }: ImpactDisplayProps) {
  if (size === "card") {
    return (
      <div>
        <p className="text-[32px] font-bold leading-none text-accent">
          {formatImpactHours(value)}
        </p>
        <p className="mt-1 text-[12px] text-muted">{label}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[40px] font-bold leading-none text-accent">
        <CountUp end={value} decimals={1} suffix="시간" />
      </p>
      <p className="mt-2 text-[13px] font-medium text-main">{label}</p>
    </div>
  );
}
