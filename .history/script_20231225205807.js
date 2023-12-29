"use strict";

const humanScore = document.getElementById("player_score");
const aiScore = document.getElementById("ai_score");

const playerIndicator = document.getElementById("player_indicator");

const square = document.querySelectorAll(".square");

const startBtn = document.getElementById("start_button");
const playAgainBtn = document.getElementById("play-again_button");

const startGame = () => {
  playerIndicator.style.opacity = 1;
  console.log("HWDP");
};

startBtn.addEventListener("click", startGame);
