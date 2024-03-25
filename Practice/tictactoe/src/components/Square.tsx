import React from "react";

interface SquareProp {
  value: string;
  onSquareClick: () => void;
}

const Square = ({ value, onSquareClick }: SquareProp) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
