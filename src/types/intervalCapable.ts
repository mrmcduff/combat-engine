import { CorePhysical } from './attributes/corePhysical';
import { VariablePhyiscal } from './attributes/variablePhysical';

export interface IntervalCapable {
  getCorePhysical: () => CorePhysical;
  getVarPhysical: () => VariablePhyiscal;
  updateCorePhysical: (cp: CorePhysical) => void;
  updateVarPhysical: (vp: VariablePhyiscal) => void;
}
