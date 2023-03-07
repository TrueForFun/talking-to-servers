const letters = document.querySelectorAll(`.scoreboard-letter`);
const loadingDiv = document.querySelector(`.info-bar`);
const ANSWER_LENGHT = 5;
const ROUNDS = 6;

async function init() {
  let currentGuess = ``;
  let currentRow = 0;
  let done = false;
  let isLoading = true;

  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  setLoading(false);
  isLoading = false;

  const word = resObj.word.toUpperCase();
  const wordParts = word.split(``);

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGHT) {
      currentGuess += letter;
      // this one adds letters to the end
    } else {
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
      // this one replaces the last one letter
    }
    letters[ANSWER_LENGHT * currentRow + currentGuess.length - 1].innerText =
      letter;
  }
  async function comit() {
    if (currentGuess.length !== ANSWER_LENGHT) {
      // do nothing
      return;
    }

    isLoading = true;
    setLoading(true);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;
    // const {validWord} = resObj;
    // actually the line is above means the same thing. but I still don't get it

    isLoading = false;
    setLoading(false);

    if (!validWord) {
      // ! means "if it is not"

      markInvalidWord();
      return;
    }

    const guessParts = currentGuess.split(``);
    const map = makeMap(wordParts);
    console.log(map);

    for (let i = 0; i < ANSWER_LENGHT; i++) {
      // mark as correct
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGHT + i].classList.add(`correct`);
        map[guessParts[i]]--;
      }
    }
    for (let i = 0; i < ANSWER_LENGHT; i++) {
      if (guessParts[i] === wordParts[i]) {
        // do nothing. we already did that
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        //mark as close
        letters[currentRow * ANSWER_LENGHT + i].classList.add(`close`);
        map[guessParts[i]]--;
      } else {
        letters[currentRow * ANSWER_LENGHT + i].classList.add(`wrong`);
      }
    }

    currentRow++;
    if (currentGuess === word) {
      // you win
      alert(`you win!`);
      document.querySelector(`.brand`).classList.add(`winner`);
      done = true;
      return;
    } else if (currentRow === ROUNDS) {
      alert(`you lose, the word was ${word}`);
      done = true;
    }
    currentGuess = ``;
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGHT * currentRow + currentGuess.length].innerText = ``;
  }
  function markInvalidWord() {
    //alert(`not a valid word`);
    for (let i = 0; i < ANSWER_LENGHT; i++) {
      letters[currentRow * ANSWER_LENGHT + i].classList.remove(`invalid`);

      setTimeout(function () {
        letters[currentRow * ANSWER_LENGHT + i].classList.add(`invalid`);
      }, 10);
    }
  }

  document.addEventListener(`keydown`, function handleKeyPress(event) {
    if (done || isLoading) {
      // do nothing
      return;
    }

    const action = event.key;
    console.log(action);
    if (action === `Enter`) {
      comit();
    } else if (action === `Backspace`) {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle(`show`, isLoading);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();
