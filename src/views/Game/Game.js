import React, { useState, useEffect } from "react";
import { Board, GameDetails } from "./GameComponents";
import "./game.css";

const Game = () => {
  const [wordOnTiles, setWordsOnTiles] = useState([
    "r",
    "e",
    "s",
    "u",
    "l",
    "t"
  ]);
  const [rowsOfWordsToFill, setRowsOfWordsToFill] = useState(10);
  const [currentWordsRow, setCurrentWordsRow] = useState(0);
  const [wordsInRows, setWordsInRows] = useState(
    Array(rowsOfWordsToFill).fill(null)
  );
  const [textEnteredInInput, setTextEnteredInInput] = useState("");
  const timeAllotedForGame = "30";
  const [timer, setTimer] = useState(timeAllotedForGame);

  let refToSetTimer;

  useEffect(() => {
    let sec = timer;
    let secInNum = Number(sec);

    

    refToSetTimer = setTimeout(() => {
      
      if (secInNum !== 0) {
        secInNum -= 1;
        if (secInNum < 10) sec = "0" + secInNum;
        else sec = secInNum;
      }

      setTimer(sec);
    }, 1000);

    if (secInNum == 0) clearInterval(refToSetTimer);
  }, [timer]);
  


  const displayWordEntered = () => {
    let newWordsInRow = [...wordsInRows];
    newWordsInRow[currentWordsRow] = textEnteredInInput;
    setWordsInRows(newWordsInRow);
  };

  const stopTimer = ()=>{
    clearInterval(refToSetTimer);
  }

  const resetTimer = ()=>{
    clearInterval(refToSetTimer);
    setTimer(timeAllotedForGame);
  }

  const getWordList = word => {
    setWordsOnTiles(word.split(""));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (currentWordsRow === rowsOfWordsToFill) return;
    //Display word on the board
    displayWordEntered();
    //Empty Input
    setTextEnteredInInput("");
    //move to the next row
    setCurrentWordsRow(currentWordsRow + 1);
  };

  const handleFormChange = e => {
    const value = e.target.value;

    setTextEnteredInInput(value);
    // setTextEnteredInInput(textEnteredInInput => value)
  };

  return (
    <div className="container">
      <header></header>
      <section className="board-container">
        <Board
          letters={wordOnTiles}
          rowsOfWordsToFill={rowsOfWordsToFill}
          wordsInRows={wordsInRows}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          textEnteredInInput={textEnteredInInput}
        />
        <GameDetails timer={timer} />
      </section>
      <button onClick={resetTimer}>click</button>
    </div>
  );
};

export default Game;
