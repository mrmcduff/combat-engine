export type AttackResultClass =
  | 'Clean Hit'
  | 'Parry'
  | 'Armor Block'
  | 'Armor Break'
  | 'Miss'
  | 'Dodge'
  | 'Shield Block';

export const ATTACK_RESULT_CLASS: AttackResultClass[] = [
  'Clean Hit',
  'Parry',
  'Armor Block',
  'Shield Block',
  'Armor Break',
  'Miss',
  'Dodge',
];
const ATTACK_RESULT_CLASS_STRINGS = [
  'Clean Hit',
  'Parry',
  'Armor Block',
  'Shield Block',
  'Armor Break',
  'Miss',
  'Dodge',
];

export function isAttackResultClass(item: string): item is AttackResultClass {
  return ATTACK_RESULT_CLASS_STRINGS.includes(item);
}
