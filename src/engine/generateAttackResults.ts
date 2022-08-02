import { Combatant } from 'actors/combatant';
import { AttackResult } from 'types/combat/attackResult';
import { AttackResultClass } from 'types/combat/attackResultClass';

function generateEmptyAttackResult(resultClass: AttackResultClass) {
  return {
    damage: 0,
    delay: 0,
    balanceLoss: 0,
    weaponDamage: 0,
    armorDamage: 0,
    shieldDamage: 0,
    resultClass,
  };
}

export function generateAttackResults(
  attacker: Combatant,
  defender: Combatant,
  resultClass: AttackResultClass
): [AttackResult, AttackResult] {
  const atkResult = generateEmptyAttackResult(resultClass);
  const defResult = generateEmptyAttackResult(resultClass);
  switch (resultClass) {
    case 'Miss':
      atkResult.delay = 100 - attacker.getCorePhysical().quickness; // Generate Delay for miss
      atkResult.balanceLoss = 100 - attacker.getCorePhysical().balance; // Potentially also check for vulnerable status
      break;
    case 'Dodge':
      atkResult.delay = 100 - attacker.getCorePhysical().quickness; // Generate Delay for miss
      atkResult.balanceLoss = 100 - attacker.getCorePhysical().balance; // Potentially also check for vulnerable status
      defResult.balanceLoss = 100 - defender.getCorePhysical().balance;
      defResult.delay = 100 - defender.getCorePhysical().quickness;
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
    case 'Clean Hit':
      atkResult.delay = 5;
      atkResult.balanceLoss = 2;
      atkResult.weaponDamage = 1;
      defResult.armorDamage = 10;
      defResult.damage = 20;
      defResult.balanceLoss = 10;
      defResult.delay = 10;
      break;
    default:
      break;
  }

  return [atkResult, defResult];
}
