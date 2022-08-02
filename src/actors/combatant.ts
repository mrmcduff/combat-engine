import { CorePhysical } from 'types/attributes/corePhysical';
import { VariablePhyiscal } from 'types/attributes/variablePhysical';
import { WeaponExperience } from 'types/attributes/weaponExperience';
// import { IntervalCapable } from 'types/intervalCapable';
import { Weapon } from 'types/weapons/weapon';
import { WeaponType } from 'types/weapons/weaponType';

export interface Combatant {
  coreBasePhysical: CorePhysical;
  variablePhysical: VariablePhyiscal;
  effectivePhysical: CorePhysical;
  weaponExperience: Map<WeaponType, WeaponExperience>;
  equippedWeapon: Weapon | null;
}
