import React from 'react';
import Tile from './components/UI/Tiles/Tile';
import Score from './components/UI/Scores/Score';
import Timer from './components/Timer/Timer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Tile letter="A" />
      <Score name="me" score="50" />
      <Timer />
    </div>
  );
}

export default App;
