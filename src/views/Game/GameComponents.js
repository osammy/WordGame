import React from "react";
import Tiles from "../../components/Tiles/Tiles";
import Timer from "../../components/Timer/Timer";

export const Board = props => {
  const {
    letters,
    rowsOfWordsToFill,
    wordsInRows,
    textEnteredInInput,
    handleFormChange,
    handleFormSubmit
  } = props;
  return (
    <div className="board">
      <Tiles letters={letters} />
      <div className="wordsInRows">
        {wordsInRows.map((row, index) => {
          //   console.log(index + "== ",wordsInRows[index])
          return (
            <div key={index} className="enteredWords">
              {wordsInRows[index] ? (
                <span
                  style={{ color: (index + 1) % 2 === 0 ? "red" : "#000" }}
                >
                  .
                </span>
              ) : (
                wordsInRows[index]
              )}{" "}
              {wordsInRows[index]}
            </div>
          );
        })}
      </div>
      <form action="" className="word-form">
        <input
          autoComplete="off"
          autoFocus
          value={textEnteredInInput}
          onChange={handleFormChange}
          required
        />
        <button onClick={handleFormSubmit}>Send</button>
      </form>
    </div>
  );
};

export const GameDetails = ({timer}) => {
  return <div className="game-details">
      <Timer timer={timer} />
  </div>;
};
