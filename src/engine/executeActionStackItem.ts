import { ActionStackItem } from 'types/combat/actionStackItem';
import { ActionType } from 'types/combat/actionType';
import { AttackResult } from 'types/combat/attackResult';
import { CombatReady } from 'types/combat/combatReady';
import { executeAttack } from './executeAttack';
import { validateActionStackTargets } from './validateActionStackTargets';

export interface ASIResult {
  resultMap: Map<string, AttackResult>;
  interrupts: ActionStackItem[];
  follows: ActionStackItem[];
  debugOutput: string[];
}

function generateEmptyASIResult(): ASIResult {
  return {
    resultMap: new Map<string, AttackResult>(),
    interrupts: [],
    follows: [],
    debugOutput: [],
  };
}

export function executeActionStackItem<T extends CombatReady>(
  item: ActionStackItem,
  combatantMap: Map<string, T>
): ASIResult {
  if (!validateActionStackTargets(item, combatantMap)) {
    return generateEmptyASIResult();
  }

  const instigator = item.instigator
    ? combatantMap.get(item.instigator)!
    : null;
  const targets = item.targets.map((t) => combatantMap.get(t));
  if (
    item.actionType === ActionType.Attack &&
    instigator &&
    targets.length > 0
  ) {
    const [attackerResult, defenderResult, debugOutput] = executeAttack(
      instigator,
      targets[0]!
    );
    return {
      resultMap: new Map([
        [instigator.name, attackerResult],
        [targets[0]!.name, defenderResult],
      ]),
      debugOutput,
      interrupts: [],
      follows: [],
    };
  }
  return generateEmptyASIResult();
}
