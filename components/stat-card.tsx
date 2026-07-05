import { CountUp } from "./count-up";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: React.ReactNode;
}

export function StatCard({
  label,
  value,
  suffix = "",
  decimals = 0,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[13px] text-muted">{label}</span>
        <span className="text-main">{icon}</span>
      </div>
      <p className="text-[40px] font-bold leading-none text-main">
        <CountUp end={value} suffix={suffix} decimals={decimals} />
      </p>
    </div>
  );
}
