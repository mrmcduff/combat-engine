import { CorePhysical } from 'types/attributes/corePhysical';
import { VariablePhyiscal } from 'types/attributes/variablePhysical';
import { WeaponExperience } from 'types/attributes/weaponExperience';
import { Weapon } from 'types/weapons/weapon';
import { WeaponType } from 'types/weapons/weaponType';
import { cloneDeep } from 'lodash';
import { calculateBaseHealth } from 'engine/calculateBaseHealth';

import { StatusType } from 'types/status';
import { Combatant } from './combatant';

export class BaseCombatant implements Combatant {
  name: string;

  coreBasePhysical: CorePhysical;

  derivedBasePhysical: VariablePhyiscal;

  variablePhysical: VariablePhyiscal;

  effectivePhysical: CorePhysical;

  weaponExperience: Map<WeaponType, WeaponExperience>;

  statusEffects: Map<StatusType, number>;

  equippedWeapon: Weapon | null;

  constructor(
    name: string,
    corePhysical: CorePhysical,
    weaponExperience: Map<WeaponType, WeaponExperience> = new Map<
      WeaponType,
      WeaponExperience
    >()
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
    this.statusEffects = new Map<StatusType, number>();
  }

  getBaseCorePhysical(): CorePhysical {
    return cloneDeep(this.coreBasePhysical);
  }

  getActiveStatusEffects(): [StatusType, number][] {
    const output: [StatusType, number][] = [];
    this.statusEffects.forEach((turns: number, status: StatusType) => {
      if (turns !== 0) {
        // This will include both negative and positive values.
        output.push([status, turns]);
      }
    });
    return output;
  }

  getBaseVariablePhysical(): VariablePhyiscal {
    return cloneDeep(this.derivedBasePhysical);
  }

  checkStatus(statusType: StatusType): number {
    return this.statusEffects.get(statusType) ?? 0;
  }

  addStatus(statusType: StatusType, turns: number, additive = true): void {
    const existing = this.statusEffects.get(statusType) ?? 0;
    if (existing < 0 || turns < 0) {
      this.statusEffects.set(statusType, -1);
      return;
    }
    this.statusEffects.set(statusType, additive ? existing + turns : turns);
  }

  removeStatus(statusType: StatusType): void {
    this.statusEffects.delete(statusType);
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

  getEquippedWeapon(): Weapon | null {
    return this.equippedWeapon;
  }

  getVarPhysical(): VariablePhyiscal {
    return cloneDeep(this.variablePhysical);
  }

  getWeaponExperience(weaponType: WeaponType): WeaponExperience | null {
    return this.weaponExperience.get(weaponType) ?? null;
  }

  updateCorePhysical(cp: CorePhysical): void {
    this.effectivePhysical = cloneDeep(cp);
  }

  updateVarPhysical(vp: VariablePhyiscal): void {
    this.variablePhysical = cloneDeep(vp);
  }
}
