"use strict";

const humanScore = document.getElementById("player_score");
const aiScore = document.getElementById("ai_score");

const playerIndicator = document.getElementById("player_indicator");

const square = document.querySelectorAll(".square");

const startBtn = document.getElementById("start_button");
const playAgainBtn = document.getElementById("play-again_button");

let gameStarted = false;

const startGame = () => {
  gameStarted = true;

  playerIndicator.style.opacity = 1;

  const highlightOnHover = (e) => {
    if (e.type === "mouseover" && !e.target.classList.contains("x--shape")) {
      e.target.style.background = "rgb(0, 128, 0, 0.3)";
    } else {
      e.target.style.background = "";
    }
  };

  const addSign = (e) => {
    const xImg = document.createElement("img");
    xImg.src = "images/x.png";
    xImg.classList.add("x--shape");
    e.target.appendChild(xImg);

    aiTurn();
  };

  const aiTurn = () => {};

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
