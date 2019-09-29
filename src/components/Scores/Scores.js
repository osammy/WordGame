import React from "react";
import Score from "./Score";
import "./score.css";

const Scores = props => {
  console.log(props);
  // const score = props.score;
  const { players } = props;

  return (
    <div className="scores-container">
      {players.map(({ score, name, className }) => (
        <Score name={name} score={score} className={className} />
      ))}
    </div>
  );
};

export default Scores;
