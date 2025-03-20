import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(null); // null, 'friend', or 'ai'

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (gameMode === 'ai' && !calculateWinner(newBoard)) {
      setTimeout(() => {
        const aiMove = bestMove(newBoard);
        if (aiMove !== -1) {
          newBoard[aiMove] = 'O';
          setBoard([...newBoard]);
          setIsXNext(true);
        }
      }, 300);
    }
  };

  const handleRestartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleGoBackToStart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStarted(false);
    setGameMode(null);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((cell) => cell)
    ? 'Draw!'
    : `Turn: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      {!gameStarted ? (
        <div className="start-screen">
          <button onClick={() => { setGameMode('friend'); setGameStarted(true); }}>
            Play with Friend
          </button>
          <button onClick={() => { setGameMode('ai'); setGameStarted(true); }}>
            Play with AI
          </button>
        </div>
      ) : (
        <div>
          <div className="status">{status}</div>
          <div className="board">
            {board.map((cell, index) => (
              <button key={index} className="cell" onClick={() => gameMode === 'friend' || isXNext ? handleClick(index) : null}>
                {cell}
              </button>
            ))}
          </div>
          <div className="game-buttons">
            <button onClick={handleRestartGame}>Restart</button>
            <button onClick={handleGoBackToStart}>Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function minimax(newBoard, isMaximizing) {
  const winner = calculateWinner(newBoard);
  if (winner === 'X') return -1;
  if (winner === 'O') return 1;
  if (newBoard.every(cell => cell)) return 0;

  let bestScore = isMaximizing ? -Infinity : Infinity;
  let score;

  for (let i = 0; i < 9; i++) {
    if (!newBoard[i]) {
      newBoard[i] = isMaximizing ? 'O' : 'X';
      score = minimax(newBoard, !isMaximizing);
      newBoard[i] = null;

      bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
    }
  }
  return bestScore;
}

function bestMove(board) {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      let score = minimax(board, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

export default App;
