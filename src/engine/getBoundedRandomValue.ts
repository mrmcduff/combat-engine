export function getBoundedRandomValue(
  min: number,
  max: number,
  override: number | null = null
): number {
  if (override !== null) {
    return override;
  }

  return (max - min) * Math.random() + min;
}
