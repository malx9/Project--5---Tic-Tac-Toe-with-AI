"use strict";

const humanScore = document.getElementById("player_score");
const aiScore = document.getElementById("ai_score");

const playerIndicator = document.getElementById("player_indicator");

const square = document.querySelectorAll(".square");

const startBtn = document.getElementById("start_button");
const playAgainBtn = document.getElementById("play-again_button");

let gameStarted = false;
let turn = true; // true == human, false == AI\
let turnNumber = 1;
const humanChoices = [];

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
      console.log(squareID);
      humanChoices.push(squareID);
      console.log(humanChoices);
      aiTurn();
    }
  };

  const aiTurn = () => {
    turn = false;
    playerIndicator.textContent = "AI's turn...";

    // if (turnNumber === 2 && ) {
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
