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

  const STARTING_CHARS = 2;

  const [level, setLevel] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [maxScore, setMaxScore] = useState(STARTING_CHARS);
  const [characters, setCharacters] = useState<CharInfo[]>([]);
  const [activeCharacters, setActiveCharacters] = useState<CharInfo[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);
  

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
      try {
        let chars = await getCharacters(10);
        setCharacters(chars);
        setActiveCharacters(shuffleCharacters(chars).splice(0,STARTING_CHARS));
      } catch (e) {
        alert(e);
      } 
    };
    loadCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    if(currentScore === maxScore) {
      setLevel(prevLevel => prevLevel + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScore]);

  useEffect(() => {
    if (level === 1) {
      setActiveCharacters(shuffleCharacters(characters).splice(0,STARTING_CHARS));
    } else  {
      setClicked([]);
      setActiveCharacters(shuffleCharacters(characters).splice(0, level * 2));
      setMaxScore(prevMaxScore => prevMaxScore + level * 2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const incrementScore = (): void => {
    setCurrentScore(currentScore + 1);
  }

  const reset = (): void => {
    setCurrentScore(0);
    setActiveCharacters(shuffleCharacters(characters).splice(0,STARTING_CHARS));
    setClicked([]);
    setLevel(1)
    setMaxScore(STARTING_CHARS);
  }

  const handleChoice = (e:string): void => {
    if(clicked.includes(e)) {
      reset();
    }
    else {
      setClicked(prevState => clicked.concat(e));
      incrementScore();
      setActiveCharacters(prevChars => shuffleCharacters(prevChars));
    }
  }

  return (
    <div>
      <Header
        level={level}
        score={currentScore}
        bestScore={bestScore}
      />
      <Board  
        characters={activeCharacters} 
        onClick={handleChoice}
      />
    </div>
  );
}

export default App;
