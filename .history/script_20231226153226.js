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
const squaresLeft = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const startGame = () => {
  gameStarted = true;

  playerIndicator.style.opacity = 1;

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
      const squareID = e.target.id;
      console.log("TARGET", e.target);
      console.log(squareID);
      humanChoices.push(squareID);
      console.log(humanChoices);
      squaresLeft.splice(`${squareID}` + 1, 1);
      aiTurn();
    }
  };

  const aiTurn = () => {
    turn = false;
    playerIndicator.textContent = "AI's turn...";
    let aiChoice = 0;

    const lastHumanMove = Number(humanChoices[humanChoices.length - 1]);
    console.log("LAST MOVE", lastHumanMove);
    // if (lastHumanMove === 1) {
    //   const options = [2, 4, 5];
    //   const randomNumber = Math.floor(Math.random() * options.length);
    //   const chosenNumber = options[randomNumber];
    //   aiChoice = chosenNumber;
    //   console.log(aiChoice);
    // }

    const targetSquare = document.getElementById(aiChoice);
    const oImg = document.createElement("img");
    oImg.src = "images/o.png";
    oImg.classList.add("o--shape");
    targetSquare.appendChild(oImg);
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
