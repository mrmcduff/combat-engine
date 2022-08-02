import React from 'react';
import { Box, Text } from 'ink';
import { generateStockCharacter } from 'actors/stockGenerator';
import { generateTurnArray } from 'engine/generateTurnArray';
import { generateOrdinalString } from 'utils/generateOrdinalString';
import { Combatant } from 'actors/combatant';
import { executeAttack } from 'engine/executeAttack';
import { AttackResultClass } from 'types/combat/attackResultClass';

interface BottomBarProps {
  text: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ text }) => {
  const ninja = generateStockCharacter('ninja');
  const sumo = generateStockCharacter('sumo');
  const turnArray = generateTurnArray([ninja, sumo]);

  const getColorFromAttackResult = (resultClass: AttackResultClass): string => {
    switch (resultClass) {
      case 'Miss':
        return 'red';
      case 'Dodge':
        return 'magenta';
      case 'Parry':
        return 'blue';
      case 'Clean Hit':
        return 'greenBright';
    }
    return 'cyan';
  };

  const getAttackResults = (attacker: Combatant) => {
    const results = attacker.name === ninja.name ? executeAttack(ninja, sumo) : executeAttack(sumo, ninja);
    return (
      <Text
        color={getColorFromAttackResult(results[0].resultClass)}
      >{`The result was a ${results[0].resultClass}`}</Text>
    );
  };

  return (
    <Box margin={2} flexDirection="column" justifyContent="space-between">
      <Text>{text}</Text>
      <>
        {turnArray.map((ta, idx) => {
          return (
            <Box key={`${ta[0].name}-notification-${ta[1]}`} margin={1} flexDirection="column">
              <Text>{`The ${ta[0].name} goes ${generateOrdinalString(idx)} at time ${ta[1]}`}</Text>
              <Text>{getAttackResults(ta[0])}</Text>
            </Box>
          );
        })}
      </>
      <Text color="greenBright">---This is always on the bottom---</Text>
    </Box>
  );
};

export default BottomBar;
