import { calculateWinner } from './BoardUtility';
  
function minimax(board, isMaximizing) {
    const winner = calculateWinner(board);
    if (winner === 'X') return -1;
    if (winner === 'O') return 1;
    if (board.every(cell => cell)) return 0;
  
    let bestScore = isMaximizing ? -Infinity : Infinity;
    let score;
  
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = board.slice();
        newBoard[i] = isMaximizing ? 'O' : 'X';
        score = minimax(newBoard, !isMaximizing);
        newBoard[i] = null;
  
        bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
      }
    }
    return bestScore;
}
  
export function bestMove(board) {
    let bestScore = -Infinity;
    let move = -1;
  
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = board.slice();
        newBoard[i] = 'O';
        let score = minimax(newBoard, false);
  
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
}