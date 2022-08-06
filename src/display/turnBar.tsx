import { Combatant } from "actors/combatant";
import { Box, Text } from "ink";
import React from "react";

interface TurnBarProps {
  turns: [Combatant, number][];
  colorMap: (name: string) => string;
}
const TurnBar: React.FC<TurnBarProps> = ({ turns, colorMap }) => {

  return (
    <Box marginTop={2} flexDirection="row" justifyContent="space-between">
      {turns.map((t, idx) => (
        <React.Fragment key={`${t[0].name}-${t[1]}`}>
          <Text color={colorMap(t[0].name)} >{`${idx > 0 ? ' ' : ''}${t[0].name} (${t[1].toFixed(0)})`}</Text>
          {(idx < turns.length) && <Text color="cyanBright">|</Text>}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TurnBar;