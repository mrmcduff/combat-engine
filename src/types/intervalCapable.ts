import { CorePhysical } from './attributes/corePhysical';
import { VariablePhyiscal } from './attributes/variablePhysical';

export interface IntervalCapable {
  getCorePhysical: () => CorePhysical;
  getVarPhysical: () => VariablePhyiscal;
}
