import { WeaponClass } from './weaponClass';
import { WeaponType } from './weaponType';

export interface Weapon {
  readonly name: string;
  readonly weaponType: WeaponType;
  readonly durability: number;
  readonly range: number;
  readonly minRange: number;
  readonly classes: WeaponClass[];
  readonly mass: number;
  readonly edge: number;
  remainingEdge: number;
  remainingIntegrity: number;
}
