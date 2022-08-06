import { CorePhysical } from 'types/attributes/corePhysical';
import { mean } from 'lodash';

export function calculateBaseFocus(corePhysical: CorePhysical): number {
  return mean([corePhysical.mentality, corePhysical.vitality]);
}
