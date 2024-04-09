import React from 'react';
import {LogBox} from 'react-native';
import ListView from './Pages/ListView';

function App() {
  LogBox.ignoreAllLogs();
  return (
      <ListView />
  );
}

export default App;
