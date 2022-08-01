import { CorePhysical } from './attributes/corePhysical';
import { VariablePhyiscal } from './attributes/variablePhysical';

export interface Status {
  name: string;
  computeEffects: (baseStats: CorePhysical, varStats: VariablePhyiscal) => [CorePhysical, VariablePhyiscal];
  description: string;
  baseDuration: number;
}
