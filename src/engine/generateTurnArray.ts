import { times } from 'lodash';
import { IntervalCapable } from 'types/intervalCapable';
import { generateDelay } from './generateDelay';
import { generateTurnIntervals } from './generateTurnIntervals';

interface TurnArrayParams {
  length?: number;
  overrideRandom?: number;
}

const DEFAULT_PARAMS = {
  length: 10,
  overrideRandom: undefined,
};

export function getTimeArrays(
  turnTakers: IntervalCapable[],
  fixedDelays: number[],
  length: number,
  overrideRandom?: number
): number[][] {
  return turnTakers.map((tt, idx) => {
    const fixedAddon = idx < fixedDelays.length ? fixedDelays[idx]! : 0;
    const firstItem = fixedAddon + generateDelay(tt, 'initial', overrideRandom);
    const interval = generateTurnIntervals(tt);
    return times(length, (index) => firstItem + index * interval);
  });
}

export function findSmallestFirstIndex(inputs: number[][]): number {
  const firsts = inputs.map((ip) => (ip.length > 0 ? ip[0]! : Number.MAX_VALUE));
  return firsts.indexOf(Math.min(...firsts));
}

export function generateTurnArray<T extends IntervalCapable>(
  turnTakers: T[],
  fixedDelays: number[],
  params?: TurnArrayParams
): [T, number][] {
  const usedParams: TurnArrayParams = { ...DEFAULT_PARAMS, ...params };
  const length = usedParams.length ?? DEFAULT_PARAMS.length;
  const timeArrays = getTimeArrays(
    turnTakers,
    fixedDelays,
    length,
    params?.overrideRandom ?? DEFAULT_PARAMS.overrideRandom
  );
  const outputArray: [T, number][] = [];
  while (outputArray.length < length) {
    const nextIdx = findSmallestFirstIndex(timeArrays);
    if (nextIdx === -1 || timeArrays[nextIdx]!.length === 0) {
      break;
    }

    const nextValue = timeArrays[nextIdx]!.shift();
    outputArray.push([turnTakers[nextIdx]!, nextValue ?? 0]);
  }

  return outputArray;
}
