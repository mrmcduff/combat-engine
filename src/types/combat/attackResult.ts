import { AttackResultClass } from './attackResultClass';

export interface AttackResult {
  attackerName: string;
  defenderName: string;
  damage: number;
  balanceLoss: number;
  delay: number;
  weaponDamage: number;
  armorDamage: number;
  shieldDamage: number;
  resultClass: AttackResultClass;
  fatigue: number;
}
