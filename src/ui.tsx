import React, { FC } from 'react';
// import BottomBar from 'display/bottomBar';
import AppWrapper from 'display/appWrapper';

// const App: FC<{ name?: string }> = ({ name = 'Stranger' }) => <BottomBar text={`Hello ${name}`} />;

const App: FC = () => <AppWrapper />;

module.exports = App;
export default App;
