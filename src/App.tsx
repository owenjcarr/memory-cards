import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import * as _ from "lodash"

function App() {
  // const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [characters, setCharacters] = useState([]);
  const [clicked, setClicked] = useState<string[]>([]);

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
      setCharacters(shuffleCharacters(await getCharacters(5)));
    };

    loadCards();
  },[]);

  const incrementScore = ():void => {
    setScore(score + 1);
  }

  const reset = ():void => {
    setScore(0);
    setCharacters(shuffleCharacters(characters));
    setClicked([]);
  }

  // componentDidUpdate
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [bestScore, score]);

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
        level={1}
        score={score}
        bestScore={bestScore}
      />
      <Board characters={characters} onClick={handleChoice}/>
    </div>
  );
}

export default App;
