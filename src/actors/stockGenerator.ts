import { CorePhysical } from 'types/attributes/corePhysical';
import { WeaponExperience } from 'types/attributes/weaponExperience';
import { WeaponType } from 'types/weapons/weaponType';
import { Combatant } from './combatant';

type StockCharacterType = 'ninja' | 'sumo';

export function generateCorePhysical(charType: StockCharacterType): CorePhysical {
  const emptyAttributes: CorePhysical = {
    baseAtk: 0,
    baseDef: 0,
    balance: 0,
    quickness: 0,
    strength: 0,
    mass: 0,
    focus: 0,
    stamina: 0,
    vitality: 0,
  };
  switch (charType) {
    case 'ninja':
      return {
        baseAtk: 30,
        baseDef: 30,
        balance: 80,
        quickness: 75,
        strength: 20,
        mass: 20,
        focus: 65,
        stamina: 70,
        vitality: 45,
      };
    case 'sumo': {
      return {
        baseAtk: 40,
        baseDef: 60,
        balance: 40,
        quickness: 40,
        strength: 50,
        mass: 70,
        focus: 65,
        stamina: 45,
        vitality: 70,
      };
    }
    default:
      return emptyAttributes;
  }
}

export function generateWeaponExperience(charType: StockCharacterType, weaponType: WeaponType): WeaponExperience {
  const invalidExp: WeaponExperience = {
    atkExp: 0,
    defExp: 0,
    balance: 0,
    parryExp: 0,
    blockExp: 0,
  };
  if (weaponType !== 'Unarmed') {
    return invalidExp;
  }
  switch (charType) {
    case 'ninja':
      return {
        atkExp: 30,
        defExp: 40,
        balance: 50,
        parryExp: 35,
        blockExp: 0,
      };
    case 'sumo':
      return {
        atkExp: 60,
        defExp: 60,
        balance: 40,
        parryExp: 10,
        blockExp: 0,
      };
    default:
      return invalidExp;
  }
}

export function generateStockCharacter(charType: StockCharacterType): Combatant {
  switch (charType) {
    case 'ninja': {
      const ninja = {
        coreBasePhysical: generateCorePhysical(charType),
        variablePhysical: {
          health: 35,
          fatigue: 0,
        },
        effectivePhysical: generateCorePhysical(charType),
        weaponExperience: new Map<WeaponType, WeaponExperience>(),
          equippedWeapon: null,
      };
      ninja.weaponExperience.set('Unarmed', generateWeaponExperience('ninja', 'Unarmed'));
      return ninja;
    }
    case 'sumo': {
      const sumo = {
        coreBasePhysical: generateCorePhysical(charType),
        variablePhysical: {
          health: 35,
          fatigue: 0,
        },
        effectivePhysical: generateCorePhysical(charType),
          weaponExperience: new Map<WeaponType, WeaponExperience>(),
        equippedWeapon: null,
      };
      sumo.weaponExperience.set('Unarmed', generateWeaponExperience(charType, 'Unarmed'));
      return sumo;
    }
    default: {
      const sumo = {
        coreBasePhysical: generateCorePhysical(charType),
        variablePhysical: {
          health: 35,
          fatigue: 0,
        },
        effectivePhysical: generateCorePhysical(charType),
        weaponExperience: new Map<WeaponType, WeaponExperience>(),
        equippedWeapon: null,
      };
      sumo.weaponExperience.set('Unarmed', generateWeaponExperience(charType, 'Unarmed'));
      return sumo;
    }
  }
}
