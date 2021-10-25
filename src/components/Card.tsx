type Props = {
  name: string;
  src: string;
  onClick: (clicked: string) => void;
}

function Card({ name, src, onClick }: Props): JSX.Element {

  const handleClick = (e:any) => {
    onClick(name);
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={src} alt={`${name}-img`}></img>
      <p>{name}</p>
    </div>
  );
}

export default Card