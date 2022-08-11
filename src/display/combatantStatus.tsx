import { Combatant } from 'actors/combatant';
import { Box, Text } from 'ink';
import React from 'react';

interface CombatantStatusProps {
  combatants: Combatant[];
  colorMap: (name: string) => string;
}
const CombatantStatus: React.FC<CombatantStatusProps> = ({ combatants, colorMap }) => {
  return (
    <Box marginTop={1} flexDirection="row" justifyContent="flex-start">
      {combatants.map((c, idx) => {
        return (
          <Box key={`${c.name}-status` } marginLeft={idx === 0 ? 0 : 3} marginRight={idx === 1 ? 3 : 0}>
            <Text color={colorMap(c.name)}>{`Fighter ${c.name} has health ${c.getVarPhysical().health} and fatigue ${c.getVarPhysical().fatigue}`}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default CombatantStatus;