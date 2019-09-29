import React from 'react';
import axios from 'axios';
import {getUrl} from '../../data/urlController';

export const isWordInString = (word,wordOnTilesToString) => {
    console.log("word length ", word.length)
    for(let i = 0; i < word.length; i++) {
      const index = wordOnTilesToString.indexOf(word[i]);
      console.log(index);
      if (index === -1) return false;
      wordOnTilesToString = wordOnTilesToString.replace(word[i], "");
    } 
    return true;
    
};

export const simulateGetRandomWords = () => {
    const words = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const noOfWords = Math.trunc(1 + Math.random() * 10);
    let word = "";
    console.log("noOfWords --> ", noOfWords);

    for (let i = 0; i < noOfWords; i++) {
      word += words[Math.trunc(1 + Math.random() * 25)];
    }

    return word;
  };

  export const isRepeatedWord = (word,wordList) =>{
    return wordList.includes(word);
  }

  export const getValidWordFromDictionary = (permissibleText, wordsAlreadyPlayed) => {
    const options = {
        method:'GET',
        url:getUrl('valid_words_in_dictionary') + '/' + permissibleText,
        headers: {
              'Content-Type': 'application/json',
        },
        params:{
            wordsAlreadyPlayed
        },
    }

    return new Promise((resolve,reject) => {
        axios(options)
        .then((response)=>{
            const data = response.data;
            resolve(data);
        })
        .catch(err => {
            reject(err);
        })

    })
  }

  export const validateWord = (word,wordOnTiles,wordsInRows) => {
    return new Promise((resolve, reject) => {
      // const wordOnTilesToString = wordOnTiles.join("");
      word = word.toLowerCase();
      const wordInString = isWordInString(word, wordOnTiles);
      const wordIsRepeated = isRepeatedWord(word, wordsInRows);
      if (!wordInString || wordIsRepeated)
        resolve({ status: "success", word, exists: false });

      const url = getUrl("word_validate_url") + "/" + word;

      axios
        .get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  };

  export const getGameWordsList = (minCharLength,maxCharLength,noOfWords) => {
    const options = {
        method:'GET',
        url:getUrl('valid_words_in_dictionary'),
        headers: {
              'Content-Type': 'application/json',
        },
        params:{
          minCharLength,maxCharLength,noOfWords
        },
    }

    return new Promise((resolve,reject) => {
        axios(options)
        .then((response)=>{
            const data = response.data;
            resolve(data);
        })
        .catch(err => {
            reject(err);
        })

    })
  }