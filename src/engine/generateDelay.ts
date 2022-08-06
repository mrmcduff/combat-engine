import { IntervalCapable } from 'types/intervalCapable';
import { generateTurnDelay } from './generateTurnDelay';

type DelayType =
  | 'initial'
  | 'rest'
  | 'unbalance'
  | 'atk-block'
  | 'atk-parry'
  | 'atk-hit'
  | 'miss'
  | 'dodge'
  | 'def-block'
  | 'def-parry'
  | 'def-hit';

function getDelayFromType(delayType: DelayType): number {
  switch (delayType) {
    case 'initial':
      return 20;
    default:
      return 60;
  }
}

export function generateDelay(
  turnTaker: IntervalCapable,
  delayType: DelayType,
  overrideRandom?: number
): number {
  return generateTurnDelay(
    turnTaker,
    getDelayFromType(delayType),
    overrideRandom
  );
}
