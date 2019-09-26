import React from "react";
import './score.css';

const Score = (props) => {
    console.log(props)
    // const score = props.score;
    const {score, name} = props;

  return (
    <div className="player">
      <h2 className="player__name">{name}</h2>
      <div className="player__score">{score}</div>
    </div>
  );
};

export default Score;
