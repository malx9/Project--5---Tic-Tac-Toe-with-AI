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
      // console.log("HUMAN CHOICES:", humanChoices);
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

  // The problem: at some point when some row is full, the patternFinder shows all patterns (even those that are already full) and it chooses multiple squares which amount corresponds to the amount of patterns. For instance, if there's 3 patterns, the AI chooses 3 numbers, where at least one of them is rendered undefined because it had already been chosen before. This causes a TypeError with the appendChild method.

  // The solution: make the AI only choose one square, even when there are multiple patterns. Take into account that some moves may be better than the others in certain situations.

  const aiTurn = () => {
    turn = false;
    playerIndicator.textContent = "AI's turn...";
    let aiChoice = [];

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
          console.log("commonElements now is --", commonElements);

          if (commonElements.length === 2) {
            return pattern.find(
              (choice) =>
                !humanChoices.includes(choice) && !AIChoices.includes(choice)
            );
          }
          return null;
        })
        .filter((element) => element !== null); // to-do: another .filter() needs to be added to filter out the arrays from the patternFinder which include any of the winningPatterns that have already been exhausted (as in all the squares in the pattern have already been chosen, for instance if 1-4-7 all exhausted => throw it out of the patternFinder)
      AIChoices.push(aiChoice[0]); // CHECK THIS

      for (let i = 0; i < patternFinder.length; i++) {
        let exhaustedPattern = [];
        let allExhaustedPatterns = [];
        for (let j = 0; j < winningPatterns.length; j++) {
          if (winningPatterns[j] === patternFinder[i]) {
            console.log("EXHAUSTED PATTERN FOUND");
            allExhaustedPatterns.push(winningPatterns[j]);
            // console.log("EXHAUSTED PATTERN THIS ROUND:", exhaustedPattern);
            console.log("ALL EXHAUSTED PATTERNS:", allExhaustedPatterns);
            // let exhaustedPatternIndex = patternFinder.indexOf(
            //   exhaustedPattern[0]
            // );
            // console.log(
            //   "THIS IS THE INDEX FOR THE EXHAUSTED PATTERN",
            //   exhaustedPatternIndex
            // );
            // patternFinder.splice(exhaustedPatternIndex, 1);
            // console.log("patternFinder AFTER SPLICE", patternFinder);
          }
        }
      }
    }

    let indexForChoice;

    if (patternFinder.length === 0) {
      indexForChoice = Math.floor(Math.random() * possibleChoices.length); // this is problematic - maybe a rule so that the AI cannot take an already taken square?

      aiChoice.push(possibleChoices[indexForChoice]);
      AIChoices.push(aiChoice);
      console.log(
        "This AI Choice has been made because patternFinder.length === 0"
      );
    }

    console.log("THE AI CHOSE -", aiChoice);

    // console.log("possibleChoices", possibleChoices);
    // console.log("index for choice", indexForChoice);
    // console.log("aiChoice", aiChoice);
    possibleChoices = [];

    const targetSquare = document.getElementById(aiChoice);
    const oImg = document.createElement("img");
    oImg.src = "images/o.png";
    oImg.classList.add("o--shape");
    targetSquare.appendChild(oImg);

    console.log("this is what aiChoice holds now:", aiChoice);
    const squareToRemoveIndex = squaresLeft.indexOf(aiChoice[0]);
    // console.log("squareToRemoveIndex:", squareToRemoveIndex);
    squareToRemoveIndex !== null
      ? squaresLeft.splice(squareToRemoveIndex, 1)
      : console.log("The square has already been taken!", squareToRemoveIndex);
    console.log("AIChoices made in this game:", AIChoices);
    console.log("squares left on the board:", squaresLeft);
    console.log(
      "_______________________NEXT ROUND_______________________________"
    );
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
