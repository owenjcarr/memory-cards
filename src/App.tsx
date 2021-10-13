import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import * as _ from "lodash"

function App() {

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [characters, setCharacters] = useState([]);
  const [clicked, setClicked] = useState<string[]>([]);

  const [maxScore, setMaxScore] = useState(3);

  const getCharacters = async (num: number): Promise<void> => {
    const numArray = Array.from({length: num}, (_, i) => i + 1);
    const data = await fetch(`https://rickandmortyapi.com/api/character/${numArray}`)
    const charList = await data.json();
    const characters = charList.map((char: any) => {
      return {
        id: char.id,
        name: char.name,
        img: char.image
      };
    });
    return characters;
  };

  const shuffleCharacters = (characters: any) => {
    const shuffledChars: any = _.shuffle(characters)
    return shuffledChars;
  }

  // componentDidMount
  useEffect(() => {
    const loadCards = async () => {
      setCharacters(shuffleCharacters(await getCharacters(3)));
    };

    loadCards();
  },[]);

  // componentDidUpdate
  useEffect(() => {
    console.log(maxScore)
    if (score > bestScore) {
      setBestScore(score);
    }
    if(score === maxScore) {
      setLevel(level + 1);
    }
  }, [score]);

  // componentDidUpdate
  useEffect(() => {
    const nextLevel = async (chars: number) => {
      setCharacters(shuffleCharacters(await getCharacters(chars)));
    };

    if (level === 1) {
      nextLevel(3);
    } else  {
      setClicked([]);
      setMaxScore(maxScore + level * 2);
      nextLevel(level*3);
    }
  }, [level]);

  const incrementScore = ():void => {
    setScore(score + 1);
  }

  const reset = ():void => {
    setScore(0);
    setCharacters(shuffleCharacters(characters));
    setClicked([]);
    setLevel(1)
    setMaxScore(3);
  }

  const handleChoice = (e:string) => {
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
        score={score}
        bestScore={bestScore}
      />
      <Board key={level} characters={characters} onClick={handleChoice}/>
    </div>
  );
}

export default App;
