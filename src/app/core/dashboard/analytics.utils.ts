export function getUtcRangeMillis(): {
  fromUtc: number;
  toUtc: number;
} {
  const now = Date.now();

  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  return {
    fromUtc: start.getTime(),
    toUtc: now,
  };
}
