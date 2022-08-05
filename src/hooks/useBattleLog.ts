import { useReducer } from 'react';
import { AttackResult } from 'types/combat/attackResult';

interface BattleLogState {
  results: AttackResult[][];
}

interface BattleAction {
  type: 'add' | 'clear';
  results?: AttackResult[];
}

function generateEmptyLog(): BattleLogState {
  return { results: [] };
}

function logReducer(state: BattleLogState, action: BattleAction): BattleLogState {
  switch (action.type) {
    case 'add':
      return { results: state.results.concat(action.results ?? []) };
    case 'clear':
      return generateEmptyLog();
    default:
      return state;
  }
}
export function useBattleLog() {
  const [state, dispatch] = useReducer(logReducer, generateEmptyLog());

  function addResults(results: AttackResult[]): void {
    dispatch({ type: 'add', results });
  }

  function clear() {
    dispatch({ type: 'clear' });
  }
  return [state, addResults, clear] as const;
}
