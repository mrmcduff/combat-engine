import { Combatant } from 'actors/combatant';
import { ATTR_MAX } from 'constants/attributeValues';
import { AttackResult } from 'types/combat/attackResult';
import { generateAttackResults } from './generateAttackResults';

const SUCCESS_THRESHOLD = 50;
const RATIO_MAX = 10;

function aimScore(attacker: Combatant, defender: Combatant, overrideRandom?: number) {
  const { baseAtk } = attacker.getCorePhysical();
  const { balance } = attacker.getCorePhysical();
  const weaponExp = attacker.getWeaponExperience(attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed')?.atkExp ?? 0;
  const defenderMass = defender.getCorePhysical().mass;
  const score = (100 * (baseAtk + balance + weaponExp + defenderMass)) / (4 * ATTR_MAX);
  const randomFactor = overrideRandom ?? 0.3 * Math.random() + 0.85;
  return score * randomFactor;
}

function dodgeScore(attacker: Combatant, defender: Combatant, overrideRandom?: number) {
  const atkQuick = attacker.getCorePhysical().quickness;
  const defQuick = defender.getCorePhysical().quickness;
  const defBalance = defender.getCorePhysical().balance;
  const defenderMass = defender.getCorePhysical().mass;

  const atkWeaponExp = attacker.getWeaponExperience(attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed')?.atkExp ?? 0;
  const defWeaponExp = defender.getWeaponExperience(attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed')?.defExp ?? 0;

  const quickRatio = Math.min(atkQuick !== 0 ? defQuick / atkQuick : RATIO_MAX, RATIO_MAX);
  const expRatio = Math.min(atkWeaponExp !== 0 ? defWeaponExp / atkWeaponExp : RATIO_MAX, RATIO_MAX);

  const score = (100 * quickRatio * expRatio * (defBalance + defenderMass)) / (2 * ATTR_MAX);
  const randomFactor = overrideRandom ?? Math.random() / 3;
  return score * randomFactor;
}

function parryScore(attacker: Combatant, defender: Combatant, overrideRandom?: number) {
  const atkQuick = attacker.getCorePhysical().quickness;
  const defQuick = defender.getCorePhysical().quickness;
  const defBalance = defender.getCorePhysical().balance;

  const atkWeaponExp = attacker.getWeaponExperience(attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed')?.atkExp ?? 0;
  const defWeaponParryExp =
    defender.getWeaponExperience(defender.getEquippedWeapon()?.weaponType ?? 'Unarmed')?.parryExp ?? 0;

  const quickRatio = Math.min(atkQuick !== 0 ? defQuick / atkQuick : RATIO_MAX, RATIO_MAX);
  const expRatio = Math.min(atkWeaponExp !== 0 ? defWeaponParryExp / atkWeaponExp : RATIO_MAX, RATIO_MAX);
  const score = (100 * quickRatio * expRatio * defBalance) / ATTR_MAX;
  const randomFactor = overrideRandom ?? Math.random() + 0.2;
  return score * randomFactor;
}

export function executeAttack(
  attacker: Combatant,
  defender: Combatant,
  overrideRandom?: number
): [AttackResult, AttackResult] {
  // 1. Would hit?
  // Base attack skill, weapon experience, mass of defender,

  const aimed = aimScore(attacker, defender, overrideRandom) > SUCCESS_THRESHOLD;
  if (!aimed) {
    // Create the effects of the miss.
    return generateAttackResults(attacker, defender, 'Miss');
  }
  // 2. Did hit? -- check defender dodge
  const dodged = dodgeScore(attacker, defender, overrideRandom) > SUCCESS_THRESHOLD;
  if (dodged) {
    return generateAttackResults(attacker, defender, 'Dodge');
  }

  // Defender quickness, defense experience, defense against weapon experience
  // 3. Did parry? -- check defender parry
  // Defense exp, def against weapon experience, defender's weapon experience
  const parried = parryScore(attacker, defender, overrideRandom) > SUCCESS_THRESHOLD;
  if (parried) {
    return generateAttackResults(attacker, defender, 'Parry');
  }
  // 4. Did block? -- check defender block
  // Defender's armor experience, def against weapon experience

  return generateAttackResults(attacker, defender, 'Clean Hit');
}
