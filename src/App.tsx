import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import * as _ from "lodash"

interface CharInfo {
  id: number;
  name: string;
  src: string;
}

function App(): JSX.Element {

  const [level, setLevel] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [characters, setCharacters] = useState<CharInfo[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);

  const [maxScore, setMaxScore] = useState(3);

  const getCharacters = async (num: number): Promise<CharInfo[]> => {
    const numArray = Array.from({length: num}, (_, i) => i + 1);
    const data = await fetch(`https://rickandmortyapi.com/api/character/${numArray}`)
    const charList = await data.json();
    const characters = charList.map((char: any) => {
      return {
        id: char.id,
        name: char.name,
        src: char.image
      };
    });
    return characters;
  };

  const shuffleCharacters = (characters: CharInfo[]) => {
    const shuffledChars: CharInfo[] = _.shuffle(characters)
    return shuffledChars;
  }

  useEffect(() => {
    const loadCards = async () => {
      setCharacters(shuffleCharacters(await getCharacters(3)));
    };

    loadCards();
  },[]);

  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    if(currentScore === maxScore) {
      setLevel(level + 1);
    }
  }, [currentScore]);

  useEffect(() => {
    const nextLevel = async (chars: number) => {
      setCharacters(shuffleCharacters(await getCharacters(chars)));
    };

    if (level === 1) {
      nextLevel(3);
    } else  {
      setClicked([]);
      nextLevel(level * 3);
      setMaxScore(maxScore + level * 3);
    }
  }, [level]);

  const incrementScore = (): void => {
    setCurrentScore(currentScore + 1);
  }

  const reset = (): void => {
    setCurrentScore(0);
    setCharacters(shuffleCharacters(characters));
    setClicked([]);
    setLevel(1)
    setMaxScore(3);
  }

  const handleChoice = (e:string): void => {
    if(clicked.includes(e)) {
      reset();
    }
    else {
      setClicked(prevState => clicked.concat(e));
      incrementScore();
      setCharacters(shuffleCharacters(characters));
    }
  }


  return (
    <div>
      <Header
        level={level}
        score={currentScore}
        bestScore={bestScore}
      />
      <Board  characters={characters} onClick={handleChoice}/>
    </div>
  );
}

export default App;
