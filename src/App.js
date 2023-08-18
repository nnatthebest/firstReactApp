import React from 'react';
import { useState } from 'react';

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({xIsNext, squares, onPlay, currentMove}) {
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  const squaresMap = squares.map((element, index) => {
    return (
        <Square key={index} value={element} onSquareClick={() => handleClick(index)}/>
    )
  })
  return (
    <div>
      <div className='status'>{status}</div>
      <div className='current-move'>Current move: {currentMove + 1}</div>
      <div className="board-grid">
        {squaresMap}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]
  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }
  const jumtTo = (nextMove) => {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squeres, move) => {
    let desc;
    if (move > 0) {
      desc = `Go to move #${move}`
    } else {
      desc = 'Go to game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumtTo(move)}>{desc}</button>
      </li>
    )
  })
  return (
    <div className='game'>
      <div className='game-bord'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} />
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}