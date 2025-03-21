import React, { useState } from 'react';
import { calculateWinner } from './BoardUtility';
import { bestMove as miniMaxBestMove } from './MiniMax';
import { randomMove } from './RandomMoves';
import { bestMove as ruleBasedBestMove } from './RuleBased';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(null);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (gameMode.startsWith('ai') && !calculateWinner(newBoard)) {
      setTimeout(() => {
        let aiMove;
        if (gameMode === 'ai_random') aiMove = randomMove(newBoard);
        else if (gameMode === 'ai_rule_based') aiMove = ruleBasedBestMove(newBoard);
        else if (gameMode === 'ai_mini_max') aiMove = miniMaxBestMove(newBoard);

        if (aiMove !== -1) {
          setBoard((prevBoard) => {
            const updatedBoard = prevBoard.slice();
            updatedBoard[aiMove] = 'O';
            return updatedBoard;
          });
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
      ) : gameMode === 'ai' ? (
        <div className="ai-selection">
          <div className="button-column">
            <h2>Select AI Mode</h2>
            <button onClick={() => setGameMode('ai_random')}>Random Moves</button>
            <button onClick={() => setGameMode('ai_rule_based')}>Rule-Based</button>
            <button onClick={() => setGameMode('ai_mini_max')}>Mini-Max</button>
            <button onClick={() => setGameMode('ai_alpha_beta')}>Alpha-Beta Pruning</button>
            <button onClick={() => setGameMode('ai_monte_carlo')}>Monte Carlo Tree Search</button>
          </div>
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

export default App;
