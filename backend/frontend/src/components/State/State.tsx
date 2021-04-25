import "./State.scss";

export function stateToClass(percentage: number): string {
  if (percentage < 0) return "analysing";
  if (percentage < 50) return "bad";
  if (percentage < 80) return "medium";

  return "good";
}

export function getPercentage(extractedInfo: any[]): number {
  if (!extractedInfo) return -1;
  return (
    (100 * extractedInfo.filter((param) => param.content).length) /
    extractedInfo.length
  );
}

export function stateToString(percentage: number): string {
  if (percentage < 0) return "analysing";

  return Math.min(percentage, 100) + "%";
}
