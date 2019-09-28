import React, { useState, useEffect, useRef } from "react";
import { Board, GameDetails,GameStart } from "./GameComponents";
import axios from "axios";
import { getUrl } from "../../data/urlController";
import {
  simulateGetRandomWords,
  isWordInString,
  isRepeatedWord,
  getValidWordFromDictionary,
  validateWord
} from "./gameController";
import Modal from "../../components/UI/Modal/Modal";
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
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [rowsOfWordsToFill, setRowsOfWordsToFill] = useState(8);
  const [currentWordsRow, setCurrentWordsRow] = useState(-1);
  const [wordsInRows, setWordsInRows] = useState(
    Array(rowsOfWordsToFill).fill(null)
  );
  const [textEnteredInInput, setTextEnteredInInput] = useState("");
  const timeAllotedForGame = "30";
  const [timer, setTimer] = useState("00");
  const [myTurn, setMyTurn] = useState(false);
  const [gameStatus, setGameStatus] = useState("ready"); //could be 'started','ended','paused' or 'disconnected' or 'terminated'
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);
  const intervalRef = useRef();

  const settings = {
    single_player: {
      timer: true,
      timer_limit: 30,
      game_mode: "easy" //could be medium or hard
    },
    multi_player: {
      timer: true,
      timer_limit: 30,
      game_mode: "easy"
    }
  };

  const game_mode = "multi_player";
  useEffect(() => {
    const newRow = currentWordsRow + 1;
    setCurrentWordsRow(newRow);
    // console.log(myTurn)
    if (gameStatus === "started") {
      if (!myTurn) {
        // alert(myTurn);

        simulateComputerPlay(newRow);

        setMyTurn(true);
      }
    }
  }, [wordsInRows]);

  useEffect(() => {
    let sec = timer;
    let secInNum = Number(sec);
    const refToSetTimer = setTimeout(() => {
      if (secInNum !== 0) {
        secInNum -= 1;
        if (secInNum < 10) sec = "0" + secInNum;
        else sec = secInNum;
      }

      setTimer(sec);
    }, 1000);

    intervalRef.current = refToSetTimer;

    if (secInNum === 0) clearInterval(intervalRef.current);
  }, [timer]);

  const startGame = () => {
    //set player turn
    setMyTurn(true);
    //start count down timer
    setTimer(timeAllotedForGame);
    //CLOSE MODAL
    setModalIsOpen(false);
    //start game
    setGameStatus("started");
  };

  const displayWordEntered = (currentWordsRow, enteredWord) => {
    let newWordsInRow = [...wordsInRows];
    newWordsInRow[currentWordsRow] = enteredWord;
    setWordsInRows(newWordsInRow);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer("00");
  };

  const startTimer = () => {
    setTimer(timeAllotedForGame);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(timeAllotedForGame);
  };

  const getWordList = word => {
    setWordsOnTiles(word.split(""));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    if (currentWordsRow === rowsOfWordsToFill) return;
    const resp = await validateWord(
      textEnteredInInput,
      wordOnTiles,
      wordsInRows
    );
    const { exists } = resp;

    if (!exists) {
      setTextEnteredInInput("");
      return;
    }

    //determin who's turn it is to play
    setMyTurn(false);
    //Display word on the board
    displayWordEntered(currentWordsRow, textEnteredInInput);
    //Empty Input
    setTextEnteredInInput("");

    //stop Timer
    stopTimer();

    // simulateComputerPlay(newCurrentRow);
  };

  const determineNextPlayer = () => {};

  const simulateComputerPlay = newRow => {
    const { timer, timer_limit } = settings[game_mode];
    // const time = Math.trunc(1 + Math.random() * timer_limit);
    const time = 3;

    const randomWordsTimeout = setTimeout(async () => {
      // const randWord = simulateGetRandomWords();
      let response = {};

      try {
        response = await getValidWordFromDictionary(wordOnTiles, wordsInRows);
      } catch (e) {
        alert(e);
      }

      if (response.word === "") {
        //give notification it could be that computer losses cause it cant find any other words.
        clearTimeout(randomWordsTimeout);
      }

      displayWordEntered(newRow, response.word);

      //set row to the next
      setMyTurn(true);

      startTimer();
    }, time * 1000);
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
          enableInput={myTurn}
        />
        <GameDetails timer={timer} />
      </section>
      {/* <button onClick={startGame}>click</button> */}
      <Modal
        modalIsOpen={modalIsOpen}
        closeModal={() => {
          console.log("hey");
        }}
        shouldCloseOnOverlayClick={true}
        hideCloseButton={true}
      >
        <GameStart startGame={startGame} isLoading={btnIsLoading} />
      </Modal>
    </div>
  );
};

export default Game;
