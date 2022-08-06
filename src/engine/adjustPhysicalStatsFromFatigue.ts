import { Combatant } from 'actors/combatant';
import { CorePhysical } from 'types/attributes/corePhysical';
import { generateNumericAttributeRatio } from './generateNumericAttributeRatio';

/**
 * Adjust the current effective physical stats of a combatant based on fatigue.
 * Note that status effects are applied outside of this function, as this is meant
 * to be called on every turn.
 *
 * @param combatant the combatant whose effective stats need to be updated
 */
export function adjustPhysicalStatsFromFatigue(combatant: Combatant): void {
  const { vitality } = combatant.getCorePhysical();
  const { fatigue } = combatant.getVarPhysical();

  // Vitality gives you a lift here, but its effects are also decayed
  const fatigueRatio = generateNumericAttributeRatio(fatigue, false);
  const vitalityRatio = generateNumericAttributeRatio(vitality, false);
  const averageRatio = (2 * fatigueRatio + vitalityRatio) / 3;
  const baseStats = combatant.getBaseCorePhysical();
  const updatedCore: CorePhysical = {
    mass: baseStats.mass, // not affected by fatigue for obvious reasons
    baseAtk: baseStats.baseAtk * averageRatio,
    baseDef: baseStats.baseDef * averageRatio,
    strength: baseStats.strength * averageRatio,
    stamina: baseStats.stamina * averageRatio,
    vitality: baseStats.vitality * averageRatio,
    quickness: baseStats.quickness * averageRatio,
    mentality: baseStats.mentality * averageRatio,
    agility: baseStats.agility * averageRatio,
  };
  combatant.updateCorePhysical(updatedCore);
}
