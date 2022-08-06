import { Combatant } from 'actors/combatant';
import { generateStockCharacter } from 'actors/stockGenerator';
import { executeAttack } from 'engine/executeAttack';
import { executeResult } from 'engine/executeResult';
import { generateTurnArray } from 'engine/generateTurnArray';
import { useBattleLog } from 'hooks/useBattleLog';
import { Box, Text, useInput, useApp } from 'ink';
import React, { useEffect, useState } from 'react';
import BattleResults from './battleResults';
import CombatantStatus from './combatantStatus';
import InputArea from './inputArea';
import TurnBar from './turnBar';

function nameToColor(bluePerson: string, actual: string): string {
  if (actual === bluePerson) {
    return 'blueBright';
  }
  return 'magentaBright';
}

const AppWrapper: React.FC = () => {
  const { exit } = useApp();
  const ninja = generateStockCharacter('ninja');
  const bluePerson = ninja.name;
  const sumo = generateStockCharacter('sumo');
  const [turnArray, setTurnArray] = useState<[Combatant, number][]>(generateTurnArray<Combatant>([ninja, sumo], [0, 0]));
  const [colorArray, setColorArray] = useState<string[]>([]);
  const [logColorArray, setLogColorArray] = useState<string[]>([]);
  const [turnIdx, setTurnIdx] = useState<number>(0);
  const [{ results }, addResult, clear] = useBattleLog();

  const getAttacker = (): Combatant | null => {
    if (turnArray.length === 0) {
      return null;
    }
    return turnArray[0]![0];
  };
  const takeTurn = () => {
    const attacker = getAttacker();
    setTurnIdx(turnIdx + 1);
    if (attacker === null) {
      return;
    }

    const defender = attacker.name === ninja.name ? sumo : ninja;
    const [atkResult, defResult, _debugMessages] = executeAttack(attacker, defender);
    const atkDelay = executeResult(attacker, atkResult);
    const defDelay = executeResult(defender, defResult);
    const updatedTurnArray = generateTurnArray<Combatant>([attacker, defender], [atkDelay, defDelay]);
    addResult([atkResult, defResult]);
    setTurnArray(updatedTurnArray);
  };

  useEffect(() => {
    setColorArray(turnArray.map((t) => nameToColor(bluePerson, t[0].name)));
  }, [turnArray, bluePerson]);
  useEffect(() => {
    setLogColorArray(results.map((res) => (res.length > 0 ? nameToColor(bluePerson, res[0]!.attackerName) : 'red')));
  }, [results, bluePerson]);

  useInput((input, _key) => {
    if (input === 'q' || turnIdx > 9) {
      exit();
    } else if (input === 'c') {
      clear();
      setTurnArray(generateTurnArray<Combatant>([ninja, sumo], [0, 0]));
      setTurnIdx(0);
    } else if (input === 's') {
      takeTurn();
    }
  });

  return (
    <Box margin={2} flexDirection="column" justifyContent="space-between">
      <Text color="greenBright">---Turn-based Combat CLI---</Text>
      <InputArea />
      <Text>{`${JSON.stringify(ninja)}`}</Text>
      <BattleResults results={results} colors={logColorArray} />
      <CombatantStatus combatants={[ninja, sumo]} colors={['cyanBright', 'magentaBright']} />
      <TurnBar turns={turnArray} colors={colorArray} />
    </Box>
  );
};

export default AppWrapper;