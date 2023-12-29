"use strict";

const humanScore = document.getElementById("player_score");
const aiScore = document.getElementById("ai_score");

const playerIndicator = document.getElementById("player_indicator");

const square = document.querySelectorAll(".square");

const startBtn = document.getElementById("start_button");
const playAgainBtn = document.getElementById("play-again_button");

let gameStarted = false;
let turn = true; // true == human, false == AI
let turnNumber = 1;
const humanChoices = [];
const AIChoices = [];
const squaresLeft = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const winningPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const startGame = () => {
  gameStarted = true;
  playerIndicator.style.opacity = 1;
  humanTurn();
};

const humanTurn = () => {
  turn = true;

  const highlightOnHover = (e) => {
    if (
      e.type === "mouseover" &&
      turn === true &&
      !e.target.classList.contains("x--shape")
    ) {
      e.target.style.background = "rgb(0, 128, 0, 0.3)";
    } else {
      e.target.style.background = "";
    }
  };

  const addSign = (e) => {
    if (turn === true) {
      const xImg = document.createElement("img");
      xImg.src = "images/x.png";
      xImg.classList.add("x--shape");
      e.target.appendChild(xImg);
      e.target.classList.add(`player-choice-${turnNumber}`);
      turnNumber++;

      const squareID = Number(e.target.id);
      console.log(squareID);
      humanChoices.push(squareID);
      console.log("HUMAN CHOICES:", humanChoices);
      // squaresLeft.splice(`${squareID}` - 1, 1);
      const squareToRemoveIndex = squaresLeft.indexOf(squareID);
      console.log("squareToRemoveIndex:", squareToRemoveIndex);
      squareToRemoveIndex !== -1
        ? squaresLeft.splice(squareToRemoveIndex, 1)
        : console.log("The square has already been taken!");
      console.log(squaresLeft);
      aiTurn();
    }
  };

  const aiTurn = () => {
    turn = false;
    playerIndicator.textContent = "AI's turn...";
    let aiChoice = 0;

    const scanForPatterns = (choices, patterns) => {
      const matchingPatterns = patterns.filter((pattern) =>
        pattern.some((choice) => choices.includes(choice))
      );
      return matchingPatterns.length > 0 ? matchingPatterns : null;
    };
    console.log(scanForPatterns(humanChoices, winningPatterns));

    // const lastHumanMove = Number(humanChoices[humanChoices.length - 1]);
    // console.log("LAST MOVE", lastHumanMove);

    // const randomNumber = Math.floor(Math.random() * squaresLeft.length);
    // const chosenNumber = squaresLeft[randomNumber];
    // aiChoice = chosenNumber;
    // console.log(aiChoice);

    // const squareToRemoveIndex = squaresLeft.indexOf(aiChoice);
    // console.log("squareToRemoveIndex:", squareToRemoveIndex);
    // squareToRemoveIndex !== -1
    //   ? squaresLeft.splice(squareToRemoveIndex, 1)
    //   : console.log("The square has already been taken!");
    // console.log(squaresLeft);

    // const targetSquare = document.getElementById(aiChoice);
    // const oImg = document.createElement("img");
    // oImg.src = "images/o.png";
    // oImg.classList.add("o--shape");
    // targetSquare.appendChild(oImg);

    turn = true;
  };

  square.forEach((square) => {
    square.addEventListener("mouseover", highlightOnHover);
  });
  square.forEach((square) => {
    square.addEventListener("mouseout", highlightOnHover);
  });

  square.forEach((square) => {
    square.addEventListener("click", addSign);
  });
};

startBtn.addEventListener("click", startGame);
