import { IntervalCapable } from 'types/intervalCapable';
import { generateNumericAttributeRatio } from './generateNumericAttributeRatio';
import { getBoundedRandomValue as randomValue } from './getBoundedRandomValue';

export function generateTurnDelay(
  turnTaker: IntervalCapable,
  base: number,
  overrideRandom?: number
): number {
  const randomMultiplier = randomValue(0.5, 1.5, overrideRandom ?? null);
  const quickRatio = generateNumericAttributeRatio(
    turnTaker.getCorePhysical().quickness,
    false
  );
  const fatigueRatio = generateNumericAttributeRatio(
    turnTaker.getVarPhysical().fatigue,
    true
  );
  const focusRatio = generateNumericAttributeRatio(
    turnTaker.getVarPhysical().focus,
    false
  );
  const totalMultiplier = quickRatio + fatigueRatio + focusRatio ** 2;
  return totalMultiplier * base * randomMultiplier;
}
