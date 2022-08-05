import { AttackResultClass } from './attackResultClass';

export interface AttackResult {
  damage: number;
  balanceLoss: number;
  delay: number;
  weaponDamage: number;
  armorDamage: number;
  shieldDamage: number;
  resultClass: AttackResultClass;
  fatigue: number;
}
