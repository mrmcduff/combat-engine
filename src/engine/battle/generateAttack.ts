import { Combatant } from 'actors/combatant';
import { ActionStackItem } from 'types/combat/actionStackItem';
import { ActionType } from 'types/combat/actionType';

export function generateAttack(attacker: Combatant, targets: Combatant[]): ActionStackItem {
  return {
    instigator: attacker.name,
    actionParameters: '',
    actionType: ActionType.Attack,
    targets: targets.map(t => t.name)
  };
}

export function generateSingleTargetAttack(attacker: Combatant, target: Combatant): ActionStackItem {
  return generateAttack(attacker, [target]);
}