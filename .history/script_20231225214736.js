"use strict";

const humanScore = document.getElementById("player_score");
const aiScore = document.getElementById("ai_score");

const playerIndicator = document.getElementById("player_indicator");

const square = document.querySelectorAll(".square");

const startBtn = document.getElementById("start_button");
const playAgainBtn = document.getElementById("play-again_button");

let gameStarted = false;

const startGame = () => {
  playerIndicator.style.opacity = 1;

  const highlightOnHover = (e) => {
    e.target.style.opacity = 0.1;
    e.target.style.background = "green";
  };

  square.forEach((square) => {
    square.addEventListener("mouseover", highlightOnHover);
  });
};

startBtn.addEventListener("click", startGame);
