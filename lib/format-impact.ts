export function formatImpactHours(value: number): string {
  return `${Number(value).toFixed(1)}시간`;
}

export function parseSavingsPercent(label: string): number | null {
  const match = label.match(/(\d+(?:\.\d+)?)\s*%/);
  if (!match) return null;

  const value = Number(match[1]);
  return Number.isNaN(value) ? null : value;
}

export function calcAvgSavingsPercent(labels: string[]): number {
  const percents = labels
    .map(parseSavingsPercent)
    .filter((value): value is number => value !== null);

  if (percents.length === 0) return 0;

  const average = percents.reduce((sum, value) => sum + value, 0) / percents.length;
  return Math.round(average * 10) / 10;
}
