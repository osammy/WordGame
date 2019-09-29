const express = require("express");
const router = express.Router();
const fs = require("fs");
const handleError = require("../utils/handleError");

// const pathToDictionary = "./dictionary/english3.txt"
const pathToDictionary = "./dictionary/engmix.txt"

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

router.route("/word").get(async function(req, res, next) {

  const minCharLength = Number(req.query.minCharLength);
  const maxCharLength = Number(req.query.maxCharLength);
  const noOfWords = Number(req.query.noOfWords);

  let response = {};
  try {
    response = await getRandomChararacters(minCharLength, maxCharLength, noOfWords);
    res.json(response);

  } catch (e) {
    handleError(res, 500, "Error, Failed to get words get words");
  }
});

router.route("/word/:text").get(async function(req, res, next) {
  const word = req.params.text.toLowerCase();
  const wordsAlreadyPlayed = req.query.wordsAlreadyPlayed;
  console.log(wordsAlreadyPlayed);
  let response = {};
  try {
    response = await getOneUniqueWord(word, wordsAlreadyPlayed);
    res.json(response);
  } catch (e) {
    handleError(res, 500, "Error, Word checking operation failed");
  }
});

function getOneUniqueWord(word, alreadyPlayed) {
  const arr = [];
  return new Promise((resolve, reject) => {
    fs.readFile(pathToDictionary, "utf8", function(err, data) {
      if (err) reject(err);
      const pattern = `^[${word}]+$`;
      let exp = new RegExp(pattern);
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
        el => !alreadyPlayed.includes(el) && el !== word && el.length > 1
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

function getRandomChararacters(minCharLength, maxCharLength, noOfWords) {
  
  return new Promise((resolve, reject) => {
    fs.readFile(pathToDictionary, "utf8", function(err, data) {
      if (err) reject(err);

      const lengthOfWordsInDictionary = data.length;
      const exp = `^[a-z]{${minCharLength},${maxCharLength}}$`;
      const regex = new RegExp(exp);
      let eachWord = "";
      const wordMatches = [];

      //Loop through all words in dictionary to get the matches
      for (let i = 0; i < lengthOfWordsInDictionary; i++) {
        
        eachWord += data[i];
        if (data[i] == "\n") {
          //remove line break from character
          let strippedWord = eachWord.split("\n")[0];

          if (strippedWord.match(regex)) {
            wordMatches.push(strippedWord);
          }
          eachWord = "";
        }
      }

      const words = [];

      for(let i=0; i < wordMatches.length; i++) {
        randIndex = Math.trunc(Math.floor(Math.random() * (wordMatches.length)));
        words.push(wordMatches[randIndex])
        if(words.length === noOfWords) break;
        
      }

      console.log(words)

      resolve({status:"success",words});
    });
  });
}

function checkIfWordExists(word) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToDictionary, "utf8", function(err, data) {
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
