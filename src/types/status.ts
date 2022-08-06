import { CorePhysical } from './attributes/corePhysical';
import { VariablePhyiscal } from './attributes/variablePhysical';

export type StatusType =
  | 'Vulnerable'
  | 'Injured'
  | 'Wounded'
  | 'Stunned'
  | 'Amped'
  | 'Shaken';

export const STATUS_TYPE: StatusType[] = [
  'Vulnerable',
  'Injured',
  'Wounded',
  'Stunned',
  'Amped',
  'Shaken',
];

const STATUS_TYPE_STRINGS = [
  'Vulnerable',
  'Injured',
  'Wounded',
  'Stunned',
  'Amped',
  'Shaken',
];

export function isStatusType(item: string): item is StatusType {
  return STATUS_TYPE_STRINGS.includes(item);
}

export interface Status {
  name: StatusType;
  corePhysicalEffects: CorePhysical;
  varPhysicalEffects: VariablePhyiscal;
  description: string;
  baseDuration: number;
}
