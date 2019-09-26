import React, { useState,useEffect } from "react";
import './timer.css';

const Timer = ({ startTime }) => {
  const [timer, setTimer] = useState("10");

  function start() {
    setTimeout(handleIncrementTimer, 1000);
  }

  useEffect(start);
  function handleIncrementTimer() {
    let sec = timer;
    let secInNum = Number(sec)

    if (secInNum !== 0) {
      secInNum -= 1;
      if (secInNum < 10) sec = "0" + secInNum;
      else sec = secInNum;
    }

    setTimer(sec);
  }

  return <div className="timer">{timer}</div>;
};


export default Timer;