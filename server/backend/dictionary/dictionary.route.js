const express = require("express");
const router = express.Router();
const fs = require("fs");
const handleError = require("../utils/handleError");

router.route("/valid/:word").get(async function(req, res, next) {
  const word = req.params.word.toLowerCase();
  let response = {};
  try {
    response = await checkIfWordExists(word);
    res.json(response);
  } catch (e) {
    handleError(res, 500, "Error, Word checking operation failed");
  }
});

router.route("/word/:text").get(async function(req, res, next) {
  const word = req.params.text.toLowerCase();
  const wordsAlreadyPlayed = req.query.wordsAlreadyPlayed;
  console.log(wordsAlreadyPlayed)
  let response = {};
  try {
    response = await getOneUniqueWord(word,wordsAlreadyPlayed);
    res.json(response);
  } catch (e) {
    handleError(res, 500, "Error, Word checking operation failed");
  }
});

function getOneUniqueWord(word,alreadyPlayed) {
  const arr = [];
  return new Promise((resolve, reject) => {
    fs.readFile("./dictionary/english3.txt", "utf8", function(err, data) {
      if (err) reject(err);
      const pattern = `^[${word}]+$`;
      let exp = new RegExp(pattern);
      //   exp = /^[a-z]+$/;
      // letters = /^[azertyuiop]+$/;
      //   const dMatch = word.match(exp);
      let eachWord = "";
      let dMatch;
      for (let i = 0; i < data.length; i++) {
        eachWord += data[i];
        if (data[i] == "\n") {
          let strippedWord = eachWord.split("\n")[0];
          dMatch = strippedWord.match(exp);

          if (dMatch) {
            let sampleText = word;
            let charIsPresent = false;
            for (let i = 0; i < strippedWord.length; i++) {
              charIsPresent = sampleText.includes(strippedWord[i]);
              if (!charIsPresent) break;
              sampleText = sampleText.replace(strippedWord[i], "");
            }
            if (charIsPresent) arr.push(strippedWord);
          }
          eachWord = "";
        }
      }
      const possibleWordsToPlay = arr.filter(
        el => !alreadyPlayed.includes(el) && el !== word && (el.length > 1)
      );

      if (possibleWordsToPlay.length > 0) {
        const wordIndex = Math.trunc(
          Math.random() * (possibleWordsToPlay.length - 1)
        );

        resolve({ status: "success", word: possibleWordsToPlay[wordIndex] });
      } else {
        resolve({ status: "success", word: "" });
      }
    });
  });
}

function checkIfWordExists(word) {
  return new Promise((resolve, reject) => {
    fs.readFile("./dictionary/english3.txt", "utf8", function(err, data) {
      if (err) reject(err);
      if (data.includes(word + "\n")) {
        resolve({ status: "success", word, exists: true });
      } else {
        resolve({ status: "success", word, exists: false });
      }
    });
  });
}

module.exports = router;
