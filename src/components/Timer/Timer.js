import React, { useState,useEffect } from "react";
import './timer.css';

const Timer = ({ startTime }) => {
  const [timer, setTimer] = useState("00:00");

  function start() {
    setTimeout(handleIncrementTimer, 1000);
  }

//   useEffect(start);
  function handleIncrementTimer() {
    const minAndSec = timer.split(":");
    const sec = minAndSec[1];
    const min = minAndSec[0];

    let secInNum = Number(sec);
    let minInNum = Number(min);

    if (secInNum < 60) {
      secInNum += 1;
      if (secInNum < 10) minAndSec[1] = "0" + secInNum;
      else minAndSec[1] = secInNum;
    } else {
      minAndSec[1] = "00";
      if (minInNum < 60) {
        minInNum += 1;
        if (minInNum < 10) minAndSec[0] = "0" + minInNum;
        else minAndSec[0] = minInNum;
      }
      secInNum = 0;
      minInNum += 1;
    }

    const newTime = `${minAndSec[0]}:${minAndSec[1]}`;

    setTimer(newTime);
  }

  return <div className="timer">{timer}</div>;
};


export default Timer;