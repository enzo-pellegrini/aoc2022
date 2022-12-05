const fs = require("fs");

const scoreForShape = {
  rock: 1,
  paper: 2,
  scissor: 3,
};
const opponentMap = {
  A: "rock",
  B: "paper",
  C: "scissor",
};
const meMap = {
  X: "rock",
  Y: "paper",
  Z: "scissor",
};
const outcomeMap = {
  X: "lost",
  Y: "draw",
  Z: "won",
};
const scoreForOutcome = {
  lost: 0,
  draw: 3,
  won: 6,
};

/**
 * returns wheter a wins
 * @param {'rock'|'paper'|'scissor'} a move of a
 * @param {*} b move of b
 */
const doWin = (a, b) =>
  (a === "rock" && b === "scissor") ||
  (a === "scissor" && b === "paper") ||
  (a === "paper" && b === "rock");

const outcome = (me, opponent) =>
  doWin(me, opponent) ? "won" : doWin(opponent, me) ? "lost" : "draw";

fs.readFile("input.txt", (err, data) => {
  const scores = data
    .toString()
    .split("\n")
    .map((line) => line.split(" "))
    .filter((arr) => arr.length === 2)
    .map(([opponent, me]) => [meMap[me], opponentMap[opponent]])
    .map(
      ([me, opponent]) =>
        scoreForShape[me] + scoreForOutcome[outcome(me, opponent)]
    );

  console.log(
    "Part 1",
    scores.reduce((a, b) => a + b)
  );

  const scores2 = data
    .toString()
    .split("\n")
    .map((line) => line.split(" "))
    .filter((arr) => arr.length === 2)
    .map(([opponent, desiredOutcome]) => [
      opponentMap[opponent],
      outcomeMap[desiredOutcome],
    ])
    .map(([opponent, desiredOutcome]) => {
      const shape = Object.keys(scoreForShape).filter(
        (s) => outcome(s, opponent) === desiredOutcome
      )[0];
      return scoreForOutcome[desiredOutcome] + scoreForShape[shape];
    });
  console.log(
    "Part 2",
    scores2.reduce((a, b) => a + b)
  );
});
