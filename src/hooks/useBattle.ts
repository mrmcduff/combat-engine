import { Combatant } from 'actors/combatant';
import { executeResult } from 'engine/executeResult';
import { generateTurnArray } from 'engine/generateTurnArray';
import { useReducer } from 'react';
import { AttackResult } from 'types/combat/attackResult';

interface BattleState {
  combatants: Combatant[];
  upcomingTurns: [Combatant, number][];
  currentCombatantTurn: Combatant | null;
  currentTurn: number;
}

interface BattleAction {
  actionType: 'init' | 'result';
  combatants?: Combatant[];
  results: [Combatant, AttackResult][];
}

function generateEmptyBattleState(combatants: Combatant[] = []): BattleState {
  return {
    combatants,
    upcomingTurns: [],
    currentCombatantTurn: null,
    currentTurn: 0,
  };
}

function battleReducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.actionType) {
    case 'init':
      return { ...generateEmptyBattleState(action.combatants ?? state.combatants) };
    case 'result': {
      const delayArray = action.results.reduce<number[]>((acc, curr) => {
        const [fighter, result] = curr;
        const foundFighter = state.combatants.find(
          (cb) => cb.name === fighter.name
        );
        if (foundFighter) {
          // The fighter should be updated here.
          acc.push(executeResult(foundFighter, result));
        } else {
          acc.push(0);
        }
        return acc;
      }, []);
      const upcomingTurns = generateTurnArray(state.combatants, delayArray);
      const currentCombatantTurn = upcomingTurns[0]
        ? upcomingTurns[0][0]
        : null;
      return {
        ...state,
        upcomingTurns,
        currentCombatantTurn,
        currentTurn: state.currentTurn + 1,
      };
    }
    default:
      return { ...state };
  }
}

type BattleBoard = readonly [BattleState, (results: [Combatant, AttackResult][]) => void, (combatants: Combatant[]) => void];

export function useBattle(): BattleBoard {
  const [state, dispatch] = useReducer(battleReducer, generateEmptyBattleState());

  function initBattle(combatants: Combatant[]) {
    dispatch({ actionType: 'init', combatants, results: []});
  }

  function updateBattle(results: [Combatant, AttackResult][]) {
    dispatch({ actionType: 'result', results });
  }

  return [state, updateBattle, initBattle] as const;
}
