import { CorePhysical } from "./attributes/corePhysical";

export interface Status {
  name: string;
  computeEffects: (baseStats: CorePhysical) => CorePhysical;
  description: string;
  baseDuration: number;
}