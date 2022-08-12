import { Box, Text } from 'ink';
import React from 'react';
import { AttackResult } from 'types/combat/attackResult';

interface SimpleLogProps {
  logProps: SimpleProp[];
  colorMap: (name: string) => string;
}

interface SimpleProp {
  result: [string, string][];
  turnIdx: number;
    colorMap: (name: string) => string;
}

const SimpleLog: React.FC<SimpleProp> = ({ result, turnIdx, colorMap }) => {

  if (result.length === 0) {
    return <Text backgroundColor="grey" color="blackBright">No results yet</Text>;
  }

  return (
    <Box marginTop={1} flexDirection="column" justifyContent="flex-start">
      <Text color="white">{`Turn ${turnIdx + 1}`}</Text>
                  {result.map(res => (
              <Text key={`${res[0]}-log-${res[1]}`} color={colorMap(res[0])}>{res[1]}</Text>
            ))}
    </Box>
  );
};

export default SimpleLog;