
import { Battle } from 'engine/battle/Battle';
import React, { PropsWithChildren, useContext, useMemo } from 'react';

export type BattleContent = {
  battle: Battle;
}

function generateEmptyBattle(): Battle {
  return new Battle([]);
}

// create context
const BattleContext = React.createContext<BattleContent>({ battle: generateEmptyBattle() });

export function useBattleContext(): BattleContent {
  return useContext(BattleContext);
}
function BattleContextProvider({ children }: PropsWithChildren): JSX.Element {
  const emptyBattleContext = useMemo(() => {
    return { battle: generateEmptyBattle() };
  }, []);
  // the value that will be given to the context
  return (
    // the Provider gives access to the context to its children
    <BattleContext.Provider value={emptyBattleContext}>
      {children}
    </BattleContext.Provider>
  );
};

export { BattleContext, BattleContextProvider };
