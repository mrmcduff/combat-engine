import { ASIResult } from 'engine/executeActionStackItem';
import { ActionStackItem } from 'types/combat/actionStackItem';
import { ActionType } from 'types/combat/actionType';

export function humanLogAction(
  asi: ActionStackItem,
  asiResult: ASIResult
): [string, string][] {
  const outputLog: [string, string][] = [];
  if (
    asi.actionType === ActionType.Attack &&
    asi.instigator &&
    !!asiResult.resultMap.get(asi.instigator)
  ) {
    const atkResult = asiResult.resultMap.get(asi.instigator)!;
    const allDefResults = Array.from(asiResult.resultMap.keys())
      .filter(
        (name) => name !== asi.instigator && !!asiResult.resultMap.get(name)
      )
      .map((n) => asiResult.resultMap.get(n)!);
    outputLog.push([
      asi.instigator,
      `${asi.instigator} attacked ${atkResult.defenderName}, resulting in ${atkResult.resultClass}`,
    ]);
    allDefResults.forEach((dr) => {
      outputLog.push([
        dr.defenderName,
        `${dr.defenderName} lost ${dr.damage} health and ${dr.balanceLoss} balance. Fatigue for ${dr.defenderName} increased by ${dr.fatigue}`,
      ]);
    });
    outputLog.push([
      asi.instigator,
      `${atkResult.attackerName} lost ${atkResult.damage} health and ${atkResult.balanceLoss} balance. Fatigue for ${atkResult.attackerName} increased by ${atkResult.fatigue}`,
    ]);
  }
  return outputLog;
}
