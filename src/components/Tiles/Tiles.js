import React from "react";
import './tile.css'

const Tiles = ({ letters, handleClick }) => {
  return (
    <div className="tiles-container">
      {letters.map((letter, key) => {
        return (
          <div key={key} onClick={handleClick} className="letter">
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default Tiles;
