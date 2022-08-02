import React from 'react';
import { Box, Text } from 'ink';
import { generateStockCharacter } from 'actors/stockGenerator';
import { generateTurnArray } from 'engine/generateTurnArray';

interface BottomBarProps {
  text: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ text }) => {
    const ninja = generateStockCharacter('ninja');
    const sumo = generateStockCharacter('sumo');
    // const turnArray = generateTurnArray([ninja, sumo]);

  return (
    <Box height={6} flexDirection="column" justifyContent="space-between">
      <Text>{text}</Text>
      <Text color="greenBright">---This is always on the bottom---</Text>
    </Box>
  );
};

export default BottomBar;
