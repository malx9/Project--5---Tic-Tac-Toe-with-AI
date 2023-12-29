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
      // console.log(squareID);
      humanChoices.push(squareID);
      console.log("HUMAN CHOICES:", humanChoices);
      // squaresLeft.splice(`${squareID}` - 1, 1);
      const squareToRemoveIndex = squaresLeft.indexOf(squareID);
      // console.log("squareToRemoveIndex:", squareToRemoveIndex);
      squareToRemoveIndex !== -1
        ? squaresLeft.splice(squareToRemoveIndex, 1)
        : console.log("The square has already been taken!");
      // console.log(squaresLeft);
      aiTurn();
    }
  };

  const aiTurn = () => {
    turn = false;
    playerIndicator.textContent = "AI's turn...";
    let aiChoice = 0;

    const matchingPatterns = winningPatterns.filter((pattern) =>
      pattern.some((choice) => humanChoices.includes(choice))
    );

    let possibleChoices = matchingPatterns
      .flat()
      .filter(
        (choice) =>
          !humanChoices.includes(choice) && !AIChoices.includes(choice)
      );

    possibleChoices = [...new Set(possibleChoices)];
    console.log("Choices the AI can make", possibleChoices);

    const patternFinder = winningPatterns.filter((pattern) => {
      const commonElementsCount = pattern.filter((choice) =>
        humanChoices.includes(choice)
      ).length;
      return commonElementsCount === 2;
    });
    console.log("patternFinder", patternFinder);

    if (patternFinder.length > 0) {
      aiChoice = patternFinder
        .map((pattern) => {
          const commonElements = pattern.filter((choice) =>
            humanChoices.includes(choice)
          );

          if (commonElements.length === 2) {
            // Find the third element that is not in humanChoices
            return pattern.find((choice) => !humanChoices.includes(choice));
          }

          return null; // No match or more than two common elements
        })
        .filter((element) => element !== null);

      console.log("AI Choice:", aiChoice);
    }

    let indexForChoice;

    if (patternFinder.length === 0) {
      indexForChoice = Math.floor(Math.random() * possibleChoices.length);

      aiChoice = possibleChoices[indexForChoice];
      AIChoices.push(aiChoice);
    }

    // console.log("possibleChoices", possibleChoices);
    // console.log("index for choice", indexForChoice);
    // console.log("aiChoice", aiChoice);
    possibleChoices = [];

    const targetSquare = document.getElementById(aiChoice);
    const oImg = document.createElement("img");
    oImg.src = "images/o.png";
    oImg.classList.add("o--shape");
    targetSquare.appendChild(oImg);

    const squareToRemoveIndex = squaresLeft.indexOf(aiChoice);
    // console.log("squareToRemoveIndex:", squareToRemoveIndex);
    squareToRemoveIndex !== -1
      ? squaresLeft.splice(squareToRemoveIndex, 1)
      : console.log("The square has already been taken!");
    // console.log(squaresLeft);
    console.log("AIChoices", AIChoices);
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
