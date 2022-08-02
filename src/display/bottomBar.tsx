import React from 'react';
import { Box, Text } from 'ink';
import { generateStockCharacter } from 'actors/stockGenerator';
import { generateTurnArray } from 'engine/generateTurnArray';
import { generateOrdinalString } from 'utils/generateOrdinalString';

interface BottomBarProps {
  text: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ text }) => {
  const ninja = generateStockCharacter('ninja');
  const sumo = generateStockCharacter('sumo');
  const turnArray = generateTurnArray([ninja, sumo]);

  return (
    <Box margin={2} flexDirection="column" justifyContent="space-between">
      <Text>{text}</Text>
      <>
        {turnArray.map((ta, idx) => {
          return (
            <Text key={`${ta[0].name}-notification-${ta[1]}`}>{`The ${ta[0].name} goes ${generateOrdinalString(
              idx
            )} at time ${ta[1]}`}</Text>
          );
        })}
      </>
      <Text color="greenBright">---This is always on the bottom---</Text>
    </Box>
  );
};

export default BottomBar;
