type Props = {
  level: number;
  score: number;
  bestScore: number;
}

function Header({level, score, bestScore}: Props): JSX.Element {
  return( 
    <header>
      <h1>Memory Game</h1>
      <div className="score-board">
        <p>Level: {level}</p>
        <p>Current Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </header>
  );
}

export default Header;