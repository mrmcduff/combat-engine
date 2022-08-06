import { ATTR_MAX } from 'constants/attributeValues';

export function generateNumericAttributeRatio(
  attrValue: number,
  higherIsBetter: boolean
): number {
  if (higherIsBetter) {
    return attrValue / ATTR_MAX;
  }
  return (ATTR_MAX - attrValue) / ATTR_MAX;
}
