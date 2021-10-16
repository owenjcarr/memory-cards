import React from "react" 
import Card from "./Card"

interface Cards {
  id: number;
  src: string;
  name: string;
}

type Props = {
  characters: Cards[],
  onClick: (clicked: string) => void
}

function Board({characters, onClick}: Props){
  
  const cards = characters.map(char => 
    <Card 
      key={char.id}
      name={char.name}
      src={char.src}
      onClick={onClick}
    />
  );

  return (
    <div className="board">{cards}</div>
  );
}

export default Board;