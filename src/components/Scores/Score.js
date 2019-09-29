import React from "react";
import "./score.css";

const Score = props => {
  const { score, name, className } = props;

  return (
    <div className={className}>
      <h2 className="player__name">{name}</h2>
      <div className="player__score">{score}</div>
    </div>
  );
};

export default Score;
