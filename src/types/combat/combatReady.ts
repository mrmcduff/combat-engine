import { WeaponExperience } from 'types/attributes/weaponExperience';
import { EquipCapable } from 'types/equipCapable';
import { IntervalCapable } from 'types/intervalCapable';
import { Nameable } from 'types/nameable';
import { StatusType } from 'types/status';
import { WeaponType } from 'types/weapons/weaponType';

export interface CombatReady extends IntervalCapable, EquipCapable, Nameable {
  getWeaponExperience: (weaponType: WeaponType) => WeaponExperience | null;
  addStatus: (statusType: StatusType, turns: number, additive: boolean) => void;
  removeStatus: (statusType: StatusType) => void;
  checkStatus: (statusType: StatusType) => number;
  getActiveStatusEffects: () => [StatusType, number][];
}
