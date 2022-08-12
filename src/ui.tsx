import React, { FC } from 'react';
// import BottomBar from 'display/bottomBar';
import AppWrapper from 'display/appWrapper';
import { BattleContextProvider } from 'hooks/useBattleContext';

// const App: FC<{ name?: string }> = ({ name = 'Stranger' }) => <BottomBar text={`Hello ${name}`} />;

const App: FC = () => {
  return (
    <BattleContextProvider>
      <AppWrapper />
    </BattleContextProvider>
  )
};

module.exports = App;
export default App;
