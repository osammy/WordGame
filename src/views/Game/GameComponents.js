import React from "react";
import Tiles from "../../components/Tiles/Tiles";
import Timer from "../../components/Timer/Timer";
import Scores from "../../components/Scores/Scores";
import { Button } from "@chakra-ui/core";
// import { IoIosSquare } from "react-icons/io";

export const Board = props => {
  const {
    letters,
    rowsOfWordsToFill,
    wordsInRows,
    enableInput,
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
                <span style={{ color: (index + 1) % 2 === 0 ? "red" : "#000" }}>
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
          disabled={!enableInput}
        />
        <button onClick={handleFormSubmit}>Play</button>
      </form>
    </div>
  );
};

export const GameDetails = ({ timer, players }) => {
  return (
    <div className="game-details">
      <Timer timer={timer} />
      {/* <Score name="samuel" score="90" /> */}
      <Scores  players={players} />
    </div>
  );
};

export const GameStart = ({ startGame,isLoading }) => {
  return (
    <div className="game-ready">
      <h2>Start Game!</h2>
      <div>
        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          fontSize="2em"
          borderRadius="20px"
          onClick={startGame}
          isLoading={isLoading}
          loadingText="waiting..."
        >
          Start
        </Button>
      </div>
    </div>
  );
};
