import { CorePhysical } from 'types/attributes/corePhysical';
import { VariablePhyiscal } from 'types/attributes/variablePhysical';
import { WeaponExperience } from 'types/attributes/weaponExperience';
import { ActionStackItem } from 'types/combat/actionStackItem';
import { CombatReady } from 'types/combat/combatReady';
import { StatusType } from 'types/status';
import { Weapon } from 'types/weapons/weapon';
import { WeaponType } from 'types/weapons/weaponType';

export interface Combatant extends CombatReady {
  name: string;
  coreBasePhysical: CorePhysical;
  variablePhysical: VariablePhyiscal;
  effectivePhysical: CorePhysical;
  weaponExperience: Map<WeaponType, WeaponExperience>;
  statusEffects: Map<StatusType, number>;
  equippedWeapon: Weapon | null;
  actionLog: ActionStackItem[];
  getWeaponExperience: (weaponType: WeaponType) => WeaponExperience | null;
  addStatus: (statusType: StatusType, turns: number, additive: boolean) => void;
  removeStatus: (statusType: StatusType) => void;
  checkStatus: (statusType: StatusType) => number;
  getActiveStatusEffects: () => [StatusType, number][];
  getBaseVariablePhysical: () => VariablePhyiscal;
  getBaseCorePhysical: () => CorePhysical;
  getLastAction: () => ActionStackItem | null;
  logAction: (action: ActionStackItem) => void;
}
