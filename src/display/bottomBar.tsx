import React from 'react';
import { Box, Text } from 'ink';

interface BottomBarProps {
  text: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ text }) => {
  return (
    <Box height={6} flexDirection="column" justifyContent="space-between">
      <Text>{text}</Text>
      <Text color="greenBright">---This is always on the bottom---</Text>
    </Box>
  );
};

export default BottomBar;
