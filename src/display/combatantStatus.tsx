import { Combatant } from "actors/combatant";
import { Box, Text } from "ink";
import React from "react";

interface CombatantStatusProps {
  combatants: Combatant[];
  colors: string[];
}
const CombatantStatus: React.FC<CombatantStatusProps> = ({ combatants, colors }) => {
  if (colors.length !== combatants.length) {
    return <Text>Error: color array not long enough for combatants array.</Text>;
  }
  return (
    <Box marginTop={1} flexDirection="row" justifyContent="flex-start">
      {combatants.map((c, idx) => {
        return (
          <Box marginLeft={idx === 0 ? 0 : 3} marginRight={idx === 1 ? 3 : 0}>
            <Text color={colors[idx]}>{`Fighter ${c.name} has health ${c.getVarPhysical().health} and fatigue ${c.getVarPhysical().fatigue}`}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default CombatantStatus;