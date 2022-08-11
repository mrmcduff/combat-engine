import { AttackResult } from 'types/combat/attackResult';
import { AttackResultClass } from 'types/combat/attackResultClass';
import { CombatReady } from 'types/combat/combatReady';

function generateEmptyAttackResult(
  resultClass: AttackResultClass
): AttackResult {
  return {
    attackerName: '',
    defenderName: '',
    damage: 0,
    delay: 0,
    balanceLoss: 0,
    weaponDamage: 0,
    armorDamage: 0,
    shieldDamage: 0,
    fatigue: 0,
    resultClass,
  };
}

export function generateAttackResults(
  attacker: CombatReady,
  defender: CombatReady,
  resultClass: AttackResultClass
): [AttackResult, AttackResult] {
  const atkResult = generateEmptyAttackResult(resultClass);
  const defResult = generateEmptyAttackResult(resultClass);
  atkResult.attackerName = attacker.name;
  atkResult.defenderName = defender.name;
  defResult.attackerName = attacker.name;
  defResult.defenderName = defender.name;
  switch (resultClass) {
    case 'Miss':
      atkResult.delay = 100 - attacker.getCorePhysical().quickness; // Generate Delay for miss
      atkResult.balanceLoss = 100 - attacker.getVarPhysical().balance; // Potentially also check for vulnerable status
      break;
    case 'Dodge':
      atkResult.delay = 100 - attacker.getCorePhysical().quickness; // Generate Delay for miss
      atkResult.balanceLoss = 100 - attacker.getVarPhysical().balance; // Potentially also check for vulnerable status
      defResult.balanceLoss = 100 - defender.getVarPhysical().balance;
      defResult.delay = 100 - defender.getCorePhysical().quickness;
      atkResult.fatigue = 100 - attacker.getCorePhysical().stamina;
      defResult.fatigue = Math.max(
        100 -
          defender.getVarPhysical().balance -
          defender.getCorePhysical().stamina,
        0
      );
      break;
    case 'Parry':
      atkResult.delay = 5;
      atkResult.balanceLoss = 5;
      atkResult.weaponDamage = 5;
      defResult.weaponDamage = 5;
      atkResult.damage = 5;
      defResult.damage = 5;
      defResult.balanceLoss = 5;
      defResult.delay = 2;
      break;
    case 'Armor Block':
      atkResult.delay = 5;
      atkResult.balanceLoss = 2;
      atkResult.weaponDamage = 2; // some function of the armor
      atkResult.fatigue = 10;
      defResult.armorDamage = 10; // some function of the armor
      defResult.damage = 10; // vitality - armor rating
      defResult.balanceLoss = 10;
      defResult.delay = 10;
      defResult.fatigue = 10;
      break;
    case 'Clean Hit':
      atkResult.delay = 5;
      atkResult.balanceLoss = 2;
      atkResult.weaponDamage = 1;
      atkResult.fatigue = 5;
      defResult.armorDamage = 10;
      defResult.damage = 20;
      defResult.balanceLoss = 10;
      defResult.delay = 10;
      defResult.fatigue = 15;
      break;
    default:
      break;
  }

  return [atkResult, defResult];
}
