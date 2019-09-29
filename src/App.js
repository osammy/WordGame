import React from 'react';
import {Route} from 'react-router-dom';
import Game from './views/Game/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Route exact component={Home} /> */}
      <Route path="/game/:id" component={Game} />
    </div>
  );
}

export default App;
