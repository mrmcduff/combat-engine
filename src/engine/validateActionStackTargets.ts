import { ActionStackItem } from 'types/combat/actionStackItem';
import { Nameable } from 'types/nameable';

export function validateActionStackTargets(
  asi: ActionStackItem,
  targetMap: Map<string, Nameable>
): boolean {
  const instigatorPasses =
    asi.instigator === null || !!targetMap.get(asi.instigator);
  const targetsPass = asi.targets.every((t) => !!targetMap.get(t));
  return instigatorPasses && targetsPass;
}
