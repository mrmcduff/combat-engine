import { IntervalCapable } from 'types/intervalCapable';
import { generateTurnDelay } from './generateTurnDelay';

type DelayType = 'initial' | 'attack' | 'defend' | 'rest' | 'unbalance';

function getDelayFromType(delayType: DelayType): number {
  switch (delayType) {
    case 'initial':
      return 20;
    default:
      return 60;
  }
}

export function generateDelay(turnTaker: IntervalCapable, delayType: DelayType, overrideRandom = false): number {
  return generateTurnDelay(turnTaker, getDelayFromType(delayType), overrideRandom);
}
