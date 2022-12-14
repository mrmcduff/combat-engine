import { IntervalCapable } from 'types/intervalCapable';
import { generateNumericAttributeRatio } from './generateNumericAttributeRatio';

const BASE_VALUE = 60;

export function generateTurnIntervals(turnTaker: IntervalCapable): number {
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
  const massRatio = generateNumericAttributeRatio(
    turnTaker.getCorePhysical().mass,
    true
  );
  const totalMultiplier =
    quickRatio ** 2 + fatigueRatio + focusRatio + massRatio;

  return totalMultiplier * BASE_VALUE;
}
