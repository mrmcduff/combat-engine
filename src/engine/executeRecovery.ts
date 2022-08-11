import { Combatant } from 'actors/combatant';
import { ActionType } from 'types/combat/actionType';
import { StatusType } from 'types/status';
import { generateNumericAttributeRatio } from './generateNumericAttributeRatio';

function getAdjustmentMultipleByActionType(actionType: ActionType): number {
  switch (actionType) {
    case ActionType.Attack:
      return 0.2;
    case ActionType.ActiveDefense:
      return 0.6;
    case ActionType.ActiveDodge:
      return 0.4;
    case ActionType.Rest:
      return 1;
    case ActionType.ActiveReset:
      return 0.8;
    default:
      return 0.5;
  }
}

export function getStatusAdjustmentByType(status: StatusType): number {
  switch (status) {
    case 'Amped':
      return 1.5;
    case 'Injured':
      return 0.8;
    case 'Wounded':
      return 0.2;
    case 'Shaken':
      return 0.4;
    case 'Stunned':
      return 0.3;
    case 'Vulnerable':
      return 0.5;
    default:
      return 1;
  }
}

export function executeRecovery(
  combatant: Combatant,
  actionType: ActionType
): void {
  const varPhysical = combatant.getVarPhysical();
  const corePhysical = combatant.getCorePhysical();
  const baseVariablePhysical = combatant.getBaseVariablePhysical();

  // Fatigue recovery is positively influenced by stamina (heavy) and vitality (light), plus 'amped' status
  // FR is negatively influenced by stunned / injured / wounded / shaken status
  const staminaRatio = generateNumericAttributeRatio(
    corePhysical.stamina,
    true
  );
  const vitalityRatio = generateNumericAttributeRatio(
    corePhysical.vitality,
    true
  );
  const healthRatio = varPhysical.health / baseVariablePhysical.health;
  const averageRatio = (3 * staminaRatio + vitalityRatio + healthRatio) / 5;
  const possibleRecovery = Math.floor(averageRatio * varPhysical.fatigue);
  const actionAdjustment = getAdjustmentMultipleByActionType(actionType);
  const statusEffects = combatant.getActiveStatusEffects();
  const statusRatio = statusEffects
    .map((se) => getStatusAdjustmentByType(se[0]))
    .reduce((acc, curr) => {
      return acc * curr;
    }, 1);
  const actualRecovery = Math.max(
    Math.round(statusRatio * actionAdjustment * possibleRecovery),
    varPhysical.fatigue
  );
  combatant.updateVarPhysical({
    ...varPhysical,
    fatigue: varPhysical.fatigue - actualRecovery,
  });

  // Now add balance recovery!
  // Now add focus recovery!
}
