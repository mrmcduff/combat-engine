import React, { FC } from 'react';
import BottomBar from 'display/bottomBar';

const App: FC<{ name?: string }> = ({ name = 'Stranger' }) => <BottomBar text={`Hello ${name}`} />;

module.exports = App;
export default App;
