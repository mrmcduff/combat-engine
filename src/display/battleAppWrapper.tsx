import { generateStockCharacter } from 'actors/stockGenerator';
import { executeAttack } from 'engine/executeAttack';
import { useBattle } from 'hooks/useBattle';
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

const BattleAppWrapper: React.FC = () => {
  const { exit } = useApp();
  const ninja = generateStockCharacter('ninja');
  const bluePerson = ninja.name;
  const sumo = generateStockCharacter('sumo');
  const [logColorArray, setLogColorArray] = useState<string[]>([]);
  const [battleBoard, updateBattle, initBattle] = useBattle();
  const [{ results }, addResult, clear] = useBattleLog();

  const takeTurn = () => {
    const attacker = battleBoard.currentCombatantTurn;
    if (attacker === null) {
      return;
    }

    // 0 - combatant recovery
    // 1 - apply fatigue update
    // 2 - execute action/attack
    // 3 - apply result (in battle hook?)
    // 4 - apply fatigue update

    const defender = attacker.name === ninja.name ? sumo : ninja;
    const [atkResult, defResult, _debugMessages] = executeAttack(attacker, defender);
    // const atkDelay = executeResult(attacker, atkResult);
    // const defDelay = executeResult(defender, defResult);
    // const updatedTurnArray = generateTurnArray<Combatant>([attacker, defender], [atkDelay, defDelay]);
    updateBattle([[attacker, atkResult], [defender, defResult]]);
    addResult([atkResult, defResult]);
  };


  useEffect(() => {
    setLogColorArray(results.map((res) => (res.length > 0 ? nameToColor(bluePerson, res[0]!.attackerName) : 'red')));
  }, [results, bluePerson]);

  useInput((input, key) => {
    if (input === 'q') {
      exit();
    } else if (input === 'c') {
      clear();
      initBattle([ninja, sumo]);
    } else if (input === ' ' || input === 't') {
      takeTurn();
    } else if (key.return) {
      initBattle([ninja, sumo]);
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
      <InputArea turn={battleBoard.currentTurn}  />
      <BattleResults results={results} colors={logColorArray} />
      <CombatantStatus combatants={battleBoard.combatants} colorMap={combatantColorMap} />
      <TurnBar turns={battleBoard.upcomingTurns} colorMap={combatantColorMap} />
    </Box>
  );
};

export default BattleAppWrapper;
