import { Combatant } from 'actors/combatant';
import { ATTR_MAX } from 'constants/attributeValues';
import { AttackResult } from 'types/combat/attackResult';
import { generateAttackResults } from './generateAttackResults';
import { generateNumericAttributeRatio } from './generateNumericAttributeRatio';
import { getBoundedRandomValue } from './getBoundedRandomValue';

const SUCCESS_THRESHOLD = 50;
const RATIO_MAX = 10;

function aimScore(
  attacker: Combatant,
  defender: Combatant,
  overrideRandom?: number
) {
  const { baseAtk } = attacker.getCorePhysical();
  const { balance } = attacker.getVarPhysical();
  const weaponExp =
    attacker.getWeaponExperience(
      attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed'
    )?.atkExp ?? 0;
  const defenderMass = defender.getCorePhysical().mass;
  const score =
    (100 * (baseAtk + balance + weaponExp + defenderMass)) / (4 * ATTR_MAX);
  const randomFactor = getBoundedRandomValue(0.85, 1.15, overrideRandom);

  return score * randomFactor;
}

function dodgeScore(
  attacker: Combatant,
  defender: Combatant,
  overrideRandom?: number
) {
  const atkQuick = attacker.getCorePhysical().quickness;
  const defQuick = defender.getCorePhysical().quickness;
  const defBalance = defender.getVarPhysical().balance;
  const defenderMass = defender.getCorePhysical().mass;

  const atkWeaponExp =
    attacker.getWeaponExperience(
      attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed'
    )?.atkExp ?? 0;
  const defWeaponExp =
    defender.getWeaponExperience(
      attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed'
    )?.defExp ?? 0;

  const quickRatio = Math.min(
    atkQuick !== 0 ? defQuick / atkQuick : RATIO_MAX,
    RATIO_MAX
  );
  const expRatio = Math.min(
    atkWeaponExp !== 0 ? defWeaponExp / atkWeaponExp : RATIO_MAX,
    RATIO_MAX
  );

  const score =
    (100 * quickRatio * expRatio * (defBalance + defenderMass)) /
    (2 * ATTR_MAX);

  const randomFactor = getBoundedRandomValue(0, 0.33, overrideRandom);
  return score * randomFactor;
}

function parryScore(
  attacker: Combatant,
  defender: Combatant,
  overrideRandom?: number
) {
  const atkQuick = attacker.getCorePhysical().quickness;
  const defQuick = defender.getCorePhysical().quickness;
  const defBalance = defender.getVarPhysical().balance;

  const atkWeaponExp =
    attacker.getWeaponExperience(
      attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed'
    )?.atkExp ?? 0;
  const defWeaponParryExp =
    defender.getWeaponExperience(
      defender.getEquippedWeapon()?.weaponType ?? 'Unarmed'
    )?.parryExp ?? 0;

  const quickRatio = Math.min(
    atkQuick !== 0 ? defQuick / atkQuick : RATIO_MAX,
    RATIO_MAX
  );
  const expRatio = Math.min(
    atkWeaponExp !== 0 ? defWeaponParryExp / atkWeaponExp : RATIO_MAX,
    RATIO_MAX
  );
  const score = (100 * quickRatio * expRatio * defBalance) / ATTR_MAX;
  const randomFactor = getBoundedRandomValue(0.2, 1.2, overrideRandom);

  return score * randomFactor;
}

function blockScore(
  attacker: Combatant,
  defender: Combatant,
  overrideRandom?: number
) {
  const { baseAtk, quickness: atkQuick } = attacker.getCorePhysical();
  const { focus: atkFocus, balance: atkBalance } = attacker.getVarPhysical();
  const { baseDef, quickness: defQuick } = defender.getCorePhysical();
  const { focus: defFocus, balance: defBalance } = defender.getVarPhysical();
  const blockExp =
    defender.getWeaponExperience(
      attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed'
    )?.blockExp ?? 0;
  const atkExp =
    attacker.getWeaponExperience(
      attacker.getEquippedWeapon()?.weaponType ?? 'Unarmed'
    )?.atkExp ?? 0;

  const quickRatio = Math.min(
    atkQuick !== 0 ? defQuick / atkQuick : RATIO_MAX,
    RATIO_MAX
  );
  const expRatio = Math.min(
    atkExp !== 0 ? blockExp / atkExp : RATIO_MAX,
    RATIO_MAX
  );
  const focusRatio = Math.min(
    atkFocus !== 0 ? defFocus / atkFocus : RATIO_MAX,
    RATIO_MAX
  );

  const score =
    (100 *
      quickRatio *
      expRatio *
      focusRatio *
      (generateNumericAttributeRatio(defBalance, true) +
        generateNumericAttributeRatio(baseDef, true) +
        generateNumericAttributeRatio(baseAtk, false) +
        generateNumericAttributeRatio(atkBalance, false))) /
    4;
  const randomFactor = getBoundedRandomValue(0.8, 1.2, overrideRandom);
  return score * randomFactor;
}

export function executeAttack(
  attacker: Combatant,
  defender: Combatant,
  overrideRandom?: number
): [AttackResult, AttackResult, string[]] {
  // 1. Would hit?
  // Base attack skill, weapon experience, mass of defender,

  const debugMessages: string[] = [];
  const aimedResult = aimScore(attacker, defender, overrideRandom);
  debugMessages.push(`Aim result: ${aimedResult}`);
  const aimed = aimedResult > SUCCESS_THRESHOLD;
  if (!aimed) {
    // Create the effects of the miss.
    return [
      ...generateAttackResults(attacker, defender, 'Miss'),
      debugMessages,
    ];
  }
  // 2. Did hit? -- check defender dodge
  const dodgeResult = dodgeScore(attacker, defender, overrideRandom);
  debugMessages.push(`Dodge result: ${dodgeResult}`);
  const dodged = dodgeResult > SUCCESS_THRESHOLD;
  if (dodged) {
    return [
      ...generateAttackResults(attacker, defender, 'Dodge'),
      debugMessages,
    ];
  }

  // Defender quickness, defense experience, defense against weapon experience
  // 3. Did parry? -- check defender parry
  // Defense exp, def against weapon experience, defender's weapon experience
  const parryResult = parryScore(attacker, defender, overrideRandom);
  const parried = parryResult > SUCCESS_THRESHOLD;
  debugMessages.push(`Parry result: ${parryResult}`);
  if (parried) {
    return [
      ...generateAttackResults(attacker, defender, 'Parry'),
      debugMessages,
    ];
  }

  const blockResult = blockScore(attacker, defender, overrideRandom);
  const blocked = blockResult > SUCCESS_THRESHOLD;
  debugMessages.push(`Block result: ${blockResult}`);
  if (blocked) {
    return [
      ...generateAttackResults(attacker, defender, 'Armor Block'),
      debugMessages,
    ];
  }
  // 4. Did block? -- check defender block
  // Defender's armor experience, def against weapon experience

  return [
    ...generateAttackResults(attacker, defender, 'Clean Hit'),
    debugMessages,
  ];
}
