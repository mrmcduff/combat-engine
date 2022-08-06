export type WeaponType =
  | 'Unarmed'
  | 'Sword'
  | 'Dagger'
  | 'Greatsword'
  | 'Axe'
  | 'Staff'
  | 'Bow'
  | 'Dart';

export const WEAPON_TYPES: WeaponType[] = [
  'Unarmed',
  'Sword',
  'Dagger',
  'Greatsword',
  'Axe',
  'Staff',
  'Bow',
  'Dart',
];
const WEAPON_TYPES_STRINGS = [
  'Unarmed',
  'Sword',
  'Dagger',
  'Greatsword',
  'Axe',
  'Staff',
  'Bow',
  'Dart',
];

export function isWeaponType(item: string): item is WeaponType {
  return WEAPON_TYPES_STRINGS.includes(item);
}
