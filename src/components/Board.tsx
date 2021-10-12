import React from "react"
import Card from "./Card"

type Props = {
  characters: { id: number, img: string, name: string}[],
  onClick: any
}

function Board({characters, onClick}: Props) {
  
  const cards = characters.map(char => 
    <Card 
      key={char.id}
      name={char.name}
      img={char.img}
      onClick={onClick}
    />
  );

  return (
    <div>{cards}</div>
  );
}

export default Board;