import { CorePhysical } from 'types/attributes/corePhysical';
import { mean } from 'lodash';

export function calculateBaseBalance(corePhysical: CorePhysical): number {
  return mean([corePhysical.agility, corePhysical.stamina]);
}
