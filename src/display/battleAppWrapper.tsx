import { generateStockCharacter } from 'actors/stockGenerator';
import { generateAttack } from 'engine/battle/generateAttack';
import { useBattleContext } from 'hooks/useBattleContext';
import { Box, Text, useInput, useApp } from 'ink';
import React, { useState } from 'react';
import CombatantStatus from './combatantStatus';
import InputArea from './inputArea';
import SimpleLog from './simpleLog';
import TurnBar from './turnBar';

// function nameToColor(bluePerson: string, actual: string): string {
//   if (actual === bluePerson) {
//     return 'blueBright';
//   }
//   return 'magentaBright';
// }

const BattleAppWrapper: React.FC = () => {
  const { exit } = useApp();
  const ninja = generateStockCharacter('ninja');
  // const bluePerson = ninja.name;
  const sumo = generateStockCharacter('sumo');
  const { battle } = useBattleContext();


  const [preTurnLogs, setPreTurnLogs] = useState<[string, string][]>([]);
  const [turnLogs, setTurnLogs] = useState<[string, string][]>([]);
  // const [postTurnLogs, setPostTurnLogs] = useState<[string, string]>([]);
  const takeTurn = () => {
    const beforeTurnLogs = battle.beforeTurn();
    setPreTurnLogs(beforeTurnLogs);
    const attacker = battle.currentCombatantTurn;
    if (attacker === null) {
      return;
    }

    // 0 - combatant recovery
    // 1 - apply fatigue update
    // 2 - execute action/attack
    // 3 - apply result (in battle hook?)
    // 4 - apply fatigue update

    const defender = attacker.name === ninja.name ? sumo : ninja;
    const asi = generateAttack(attacker, [defender]);
    const turnLogs = battle.takeTurn(asi);
    setTurnLogs(turnLogs);

    battle.afterTurn();
    // setPostTurnLogs(afterTurnLogs);
  };


  // useEffect(() => {
  //   setLogColorArray(results.map((res) => (res.length > 0 ? nameToColor(bluePerson, res[0]!.attackerName) : 'red')));
  // }, [results, bluePerson]);

  useInput((input, key) => {
    if (input === 'q') {
      exit();
    } else if (input === 'c') {
      battle.init([ninja, sumo]);
    } else if (input === ' ' || input === 't') {
      takeTurn();
    } else if (key.return) {
      battle.init([ninja, sumo]);
    }
  });

  const combatantColorMap = (cName: string) => {
    if (cName === ninja.name) {
      return 'blueBright';
    }
    return 'magentaBright';
  };

  return (
    <Box margin={2} flexDirection="column" justifyContent="space-between">
      <Text color="greenBright">---Turn-based Combat CLI---</Text>
      <InputArea turn={battle.currentTurn} />
      <SimpleLog colorMap={combatantColorMap}  result={[...preTurnLogs, ...turnLogs]} turnIdx={battle.currentTurn} />
      {/* <BattleResults results={results} colors={logColorArray} /> */}
      <CombatantStatus combatants={battle.combatants} colorMap={combatantColorMap} />
      <TurnBar turns={battle.upcomingTurns} colorMap={combatantColorMap} />
    </Box>
  );
};

export default BattleAppWrapper;
