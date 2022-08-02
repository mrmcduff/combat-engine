import { CorePhysical } from 'types/attributes/corePhysical';
import { VariablePhyiscal } from 'types/attributes/variablePhysical';
import { WeaponExperience } from 'types/attributes/weaponExperience';
import { Weapon } from 'types/weapons/weapon';
import { WeaponType } from 'types/weapons/weaponType';
import { cloneDeep } from 'lodash';
import { calculateBaseHealth } from 'engine/calculateBaseHealth';

import { Combatant } from './combatant';

export class BaseCombatant implements Combatant {
  name: string;

  coreBasePhysical: CorePhysical;

  derivedBasePhysical: VariablePhyiscal;

  variablePhysical: VariablePhyiscal;

  effectivePhysical: CorePhysical;

  weaponExperience: Map<WeaponType, WeaponExperience>;

  equippedWeapon: Weapon | null;

  constructor(
    name: string,
    corePhysical: CorePhysical,
    weaponExperience: Map<WeaponType, WeaponExperience> = new Map<WeaponType, WeaponExperience>()
  ) {
    this.name = name;
    this.coreBasePhysical = cloneDeep(corePhysical);
    this.effectivePhysical = cloneDeep(corePhysical);
    this.derivedBasePhysical = {
      health: calculateBaseHealth(corePhysical),
      fatigue: 0,
    };
    this.variablePhysical = cloneDeep(this.derivedBasePhysical);
    this.weaponExperience = cloneDeep(weaponExperience);
    this.equippedWeapon = null;
  }

  equipWeapon(weapon: Weapon): void {
    this.equippedWeapon = weapon;
  }

  removeEquipedWeapon(): void {
    this.equippedWeapon = null;
  }

  getCorePhysical(): CorePhysical {
    return cloneDeep(this.effectivePhysical);
  }

  getVarPhysical(): VariablePhyiscal {
    return cloneDeep(this.variablePhysical);
  }
}
