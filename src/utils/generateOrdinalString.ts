export function generateOrdinalString(index: number): string | null {
  const countingIndex = index + 1;
  const countingMod = countingIndex % 10;
  switch (countingMod) {
    case 1:
      return `${countingIndex}st`;
    case 2:
      return `${countingIndex}nd`;
    case 3:
      return `${countingIndex}rd`;
    default:
      return `${countingIndex}th`;
  }
}
