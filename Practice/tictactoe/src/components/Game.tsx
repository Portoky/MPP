import React, { useState } from "react";
import Board from "./Board";
import Square from "./Square";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove] || Array(9).fill(null); //!!!!!

  function handlePlay(nextSquares) {
    //saving history
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  //move index!!
  const moves = history.map((history, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="board">
        <Board
          isNext={isNext}
          squares={currentSquares}
          onPlay={handlePlay}
        ></Board>
      </div>
      <ol>{moves}</ol>
      <div className="game-info"></div>
    </div>
  );
};

export default Game;
