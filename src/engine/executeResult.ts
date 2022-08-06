import { Combatant } from 'actors/combatant';
import { ATTR_MAX } from 'constants/attributeValues';
import { AttackResult } from 'types/combat/attackResult';
import { generateTurnDelay } from './generateTurnDelay';

/**
 * Exexcute the result of a combat action on the combatant, returning any added delay.
 * The input combatant is passed by reference and updated directly.
 *
 * @param combatant the combatant for whom the results will be applied
 * @param result the result of the attack
 * @param overrideRandom a number used to override all random calculations
 * @returns the amount of delay added to the combatant from the result
 */
export function executeResult(
  combatant: Combatant,
  result: AttackResult,
  overrideRandom?: number
): number {
  const coreStats = combatant.getCorePhysical();
  const variableStats = combatant.getVarPhysical();
  // const weapon = combatant.getEquippedWeapon(); -- when we start having effects on weapons, shields, and armor, that also needs to be considered.
  coreStats.balance = Math.min(coreStats.balance - result.balanceLoss, 0);
  variableStats.fatigue = Math.min(
    variableStats.fatigue + result.fatigue,
    ATTR_MAX
  );
  variableStats.health = Math.max(variableStats.health - result.damage, 0);
  combatant.updateCorePhysical(coreStats);
  combatant.updateVarPhysical(variableStats);
  return generateTurnDelay(combatant, result.delay, overrideRandom);
}
