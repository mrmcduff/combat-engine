import { CorePhysical } from 'types/attributes/corePhysical';

export function calculateBaseHealth(corePhysical: CorePhysical): number {
  return (
    corePhysical.mass +
    corePhysical.vitality +
    corePhysical.stamina +
    corePhysical.strength
  );
}
