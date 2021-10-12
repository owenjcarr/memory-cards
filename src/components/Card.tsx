import React, { useState } from "react";

type Props = {
  name: string;
  img: string;
  onClick: any;
}

function Card({ name, img, onClick }: Props) {

  const handleClick = (e:any) => {
    onClick(name);
  }

  return (
    <div onClick={handleClick}>
      <img src={img} alt="cat"></img>
      <p>{name}</p>
    </div>
  );
}

export default Card