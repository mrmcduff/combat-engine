import { Combatant } from 'actors/combatant';
import { ActionStackItem } from 'types/combat/actionStackItem';
import { ActionType } from 'types/combat/actionType';

export function generateDefense(defender: Combatant): ActionStackItem {
  return {
    instigator: defender.name,
    targets: [defender.name],
    actionParameters: '',
    actionType: ActionType.ActiveDefense,
  };
}

export function generateDodge(defender: Combatant): ActionStackItem {
  return {
    instigator: defender.name,
    targets: [defender.name],
    actionParameters: '',
    actionType: ActionType.ActiveDodge,
  };
}
