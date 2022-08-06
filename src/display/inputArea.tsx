import { Text } from "ink";
import React from "react";

interface InputAreaProps {
  turn: number;
}

function getPromptByTurn(turn: number): string {
  if (turn === 0) {
    return 'Press [Enter] to start the battle!';
  } if (turn > 0 && turn < 10) {
    return 'Press [Space] or T to take the next turn';
  } 
    return "Combat is over.";
  
}
const InputArea: React.FC<InputAreaProps> = ({ turn }) => {
  return (
    <Text>{getPromptByTurn(turn)}</Text>
  );
};

export default InputArea;