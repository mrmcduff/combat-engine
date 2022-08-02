export interface WeaponAttributes {
  /** Base damage added by this weapon above strength */
  baseDmg: number;
  mass: number;
  /** The sharpness of the edge, or the ability to pierce without chipping. */
  edge: number;
  /** Length in spaces of range added by this weapon. 0 implies adjacent cells only. */
  length: number;
  /** Minimum length at which this weapon is effective. */
  minLength: number;
}
