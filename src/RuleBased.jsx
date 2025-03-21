import { calculateWinner } from './BoardUtility';

export function bestMove(board) {
    const winningMove = findWinningMove(board, 'O');
    if (winningMove !== -1) return winningMove;
  
    const blockingMove = findWinningMove(board, 'X');
    if (blockingMove !== -1) return blockingMove;
  
    const center = 4;
    if (!board[center]) return center;
  
    const corners = [0, 2, 6, 8].filter(i => !board[i]);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
  
    const sides = [1, 3, 5, 7].filter(i => !board[i]);
    if (sides.length > 0) return sides[Math.floor(Math.random() * sides.length)];
  
    return -1;
}
  
function findWinningMove(board, player) {
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const tempBoard = [...board];
        tempBoard[i] = player;
        if (calculateWinner(tempBoard) === player) return i;
      }
    }
    return -1;
  }
  