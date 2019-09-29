import React, { useState, useEffect, useRef } from "react";
import { Board, GameDetails, GameStart } from "./GameComponents";
import GameOver from "../../components/GameOver/GameOver";
import {Button,Box} from '@chakra-ui/core';
// import { useToast } from "@chakra-ui/core";
// import axios from "axios";
// import { getUrl } from "../../data/urlController";
import {
  simulateGetRandomWords,
  isWordInString,
  isRepeatedWord,
  getValidWordFromDictionary,
  validateWord,
  getGameWordsList
} from "./gameController";
import Modal from "../../components/UI/Modal/Modal";
import "./game.css";

const Game = () => {
  // const toast = useToast();
  const [gameOverModal, setGameOverModal] = useState(false);
  const [wordOnTiles, setWordsOnTiles] = useState("");
  const [sampleWordList,setSampleWordList] = useState([])
  const [wordSampleIndex, setWordSampleIndex] = useState(0);
  const [startGameModalIsOpen, setStartGameModalIsOpen] = useState(true);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [rowsOfWordsToFill, setRowsOfWordsToFill] = useState(7); //total of 8 zero indexed
  const [currentWordsRow, setCurrentWordsRow] = useState(-1);
  const [wordsInRows, setWordsInRows] = useState(
    Array(rowsOfWordsToFill).fill(null)
  );
  const [textEnteredInInput, setTextEnteredInInput] = useState("");
  const timeAllotedForGame = "30";
  const [timer, setTimer] = useState("00");
  const [myTurn, setMyTurn] = useState(false);
  const [gameStatus, setGameStatus] = useState("ready"); //could be 'started','ended','paused' or 'disconnected' or 'terminated'
  
  const [players, setPlayers] = useState([
    {
      id: 0,
      type: "player",
      className: "player",
      name: "Samuel",
      score: 0
    },
    {
      id: 1,
      type: "opponent",
      className: "player away",
      name: "Computer",
      score: 0
    }
  ]);

  const intervalRef = useRef();
  const inputRef = useRef();

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
      console.log("currentWordsRow " +currentWordsRow + "=== " + rowsOfWordsToFill)
      if (currentWordsRow === rowsOfWordsToFill) {
        const newIndex = wordSampleIndex + 1;
        if(newIndex > sampleWordList.length -1) return;
        //delay to allow last word display on screen before going to the next level
        setTimeout(()=>{
          initGameLevel();

        setWordsOnTiles(sampleWordList[newIndex]);
        setWordSampleIndex(newIndex);
        },1000)
        return
      };
      if (!myTurn) {
        // alert(myTurn);
        
        simulateComputerPlay(newRow);

        

        setMyTurn(true);
      }
    }
  }, [wordsInRows]);

  useEffect(() => {
    // if (timer === "00") {
    //   if (myTurn) setGameOverModal(true);
    // }

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

  const startAnotherGame = () => {
    startGame();
    //Close game over modal
    setGameOverModal(false);
  };



  const initGameLevel = () => {
    //init level
    setCurrentWordsRow(-1);
    setWordsInRows(Array(rowsOfWordsToFill).fill(null));
  };

  const initGame = () => {
    //init game
    setWordsOnTiles("");
    setWordSampleIndex(0);
    setCurrentWordsRow(-1);
    setWordsInRows(Array(rowsOfWordsToFill).fill(null));
    setTextEnteredInInput("");
    setTimer("00");
    setMyTurn(false);
    setGameOverModal(false);
    setGameStatus("ready");
    setPlayers([
      {
        id: 0,
        type: "player",
        className: "player",
        name: "Samuel",
        score: 0
      },
      {
        id: 1,
        type: "opponent",
        className: "player away",
        name: "Computer",
        score: 0
      }
    ]);
  };

  const endGame = () => {
    //determine lose and winner

    setGameOverModal(true);
    setTimer("00");
  };

  const startGame = async () => {
    //show modal loader icon
    setBtnIsLoading(true);
    //getWordsListFromServer
    const { words } = await getGameWordsList(6, 8, 100);
    //set wordlist
    setSampleWordList(words)
    //select word to be displayed on tiles
    setWordsOnTiles(words[wordSampleIndex]);
    //set player turn
    setMyTurn(true);
    //start count down timer
    setTimer(timeAllotedForGame);
    //close modal loader icon
    setBtnIsLoading(true);
    //CLOSE MODAL
    setStartGameModalIsOpen(false);
    //start game
    setGameStatus("started");
  };

  const addScore = (type, score) => {
    const copyOfPlayers = [...players];
    const index = players.findIndex(el => el.type === type);
    const playerDetails = copyOfPlayers[index];
    playerDetails.score += score;
    copyOfPlayers[index] = playerDetails;
    setPlayers(copyOfPlayers);
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
    //disallow play if time is up
    if (timer === "00") return;
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

    // add score for player
    addScore("player", 5);
  };

  const determineNextPlayer = () => {};

  const simulateComputerPlay = newRow => {

    const { timer, timer_limit } = settings[game_mode];
    // const time = Math.trunc(1 + Math.random() * timer_limit);
    const time = 1;

    const randomWordsTimeout = setTimeout(async () => {

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

      //set computer score
      addScore("opponent", 5);

      startTimer();

      //set focus to input
      inputRef.current.focus();

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
          inputRef={inputRef} 
        />
        <GameDetails timer={timer} players={players} />
      </section>
      <Modal
        modalIsOpen={startGameModalIsOpen}
        closeModal={() => {
          setStartGameModalIsOpen(false);
        }}
        shouldCloseOnOverlayClick={false}
        hideCloseButton={true}
      >
        <GameStart startGame={startGame} isLoading={btnIsLoading} />
      </Modal>
      <GameOver
        show={gameOverModal}
        noBoxShadow={true}
        startAnotherGame={startAnotherGame}
        players={players}
      />
          {/* <Button
      onClick={() =>
        toast({
          position: "bottom-left",
          render: () => (
            <Box m={3} color="white" p={3} bg="blue.500">
              Hello World
            </Box>
          ),
        })
      }
    >
      Show Toast
    </Button> */}
    </div>
  );
};

export default Game;
