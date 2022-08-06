export type ActionClass =
  | 'Attack'
  | 'Rest'
  | 'Active Defense'
  | 'Active Dodge'
  | 'Reset';

export const ACTION_CLASS: ActionClass[] = [
  'Attack',
  'Rest',
  'Active Defense',
  'Active Dodge',
  'Reset',
];

const ACTION_CLASS_STRINGS = [
  'Attack',
  'Rest',
  'Active Defense',
  'Active Dodge',
  'Reset',
];

export function isActionClass(item: string): item is ActionClass {
  return ACTION_CLASS_STRINGS.includes(item);
}
