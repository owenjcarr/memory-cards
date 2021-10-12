import React from "react";

type Props = {
  level: number,
  score: number,
  bestScore: number
}

function Header({level, score, bestScore}: Props) {
  return(
    <header>
      <h1>Memory Game</h1>
      <p>Level: {level}</p>
      <p>Current: {score}</p>
      <p>Best Score: {bestScore}</p>
    </header>
  );
}
export default Header;