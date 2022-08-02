import { Weapon } from './weapons/weapon';

export interface EquipCapable {
  equipWeapon: (weapon: Weapon) => void;
  removeEquipedWeapon: () => void;
  getEquippedWeapon: () => Weapon | null;
}
