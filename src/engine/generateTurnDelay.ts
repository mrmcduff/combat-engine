import { IntervalCapable } from 'types/intervalCapable';
import { generateNumericAttributeRatio } from './generateNumericAttributeRatio';
import { getBoundedRandomValue as randomValue } from './getBoundedRandomValue';

export function generateTurnDelay(turnTaker: IntervalCapable, base: number, overrideRandom = false): number {
  const randomMultiplier = randomValue(0.5, 1.5, overrideRandom ? 1 : null);
  const quickRatio = generateNumericAttributeRatio(turnTaker.getCorePhysical().quickness, false);
  const fatigueRatio = generateNumericAttributeRatio(turnTaker.getVarPhysical().fatigue, true);
  const focusRatio = generateNumericAttributeRatio(turnTaker.getCorePhysical().focus, false);
  const totalMultiplier = quickRatio + fatigueRatio + focusRatio ** 2;
  return totalMultiplier * base * randomMultiplier;
}
