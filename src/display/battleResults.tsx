import { Box, Text } from "ink";
import React from "react";
import { AttackResult } from "types/combat/attackResult";

interface BattleResultsProps {
  results: AttackResult[][];
  colors: string[];
}

interface BattleProp {
  result: AttackResult[];
  color: string;
  turnIdx: number;
}

const BattleResult: React.FC<BattleProp> = ({ result, color, turnIdx }) => {
  if (result.length < 2) {
    return null;
  }
  const atkResult = result[0]!;
  const defResult = result[1]!;
  return (
    <Box marginTop={1} flexDirection="column" justifyContent="flex-start">
      <Text color={color}>{`Turn ${turnIdx}: ${atkResult.attackerName} attacked ${atkResult.defenderName}, resulting in ${atkResult.resultClass}`}</Text>
      <Text color={color}>{`${defResult.defenderName} lost ${defResult.damage} health and ${defResult.balanceLoss} balance. Fatigue for ${defResult.defenderName} increased by ${defResult.fatigue}`}</Text>
      <Text color={color}>{`${atkResult.attackerName} lost ${atkResult.damage} health and ${atkResult.balanceLoss} balance. Fatigue for ${atkResult.attackerName} increased by ${atkResult.fatigue}`}</Text>
    </Box>
  );
};
const BattleResults: React.FC<BattleResultsProps> = ({ results, colors }) => {
  if (colors.length !== results.length) {
    return <Text>Error: color array not long enough for turns array.</Text>;
  }

  return (
    <Box flexDirection="column" justifyContent="flex-start">
      {results.map((res, idx) => (
        <BattleResult result={res} color={colors[idx] ?? 'white'} turnIdx={idx} />
      ))}
    </Box>
  );
};

export default BattleResults;