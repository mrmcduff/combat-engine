export type WeaponClass = 'Blunt' | 'Edged' | 'Piercing' | 'Crushing' | 'Rigid' | 'Short';

export const WEAPON_CLASS: WeaponClass[] = ['Blunt', 'Edged', 'Piercing', 'Crushing', 'Rigid', 'Short'];
const WEAPON_CLASS_STRINGS = ['Blunt', 'Edged', 'Piercing', 'Crushing', 'Rigid', 'Short'];

export function isWeaponClass(item: string): item is WeaponClass {
  return WEAPON_CLASS_STRINGS.includes(item);
}
