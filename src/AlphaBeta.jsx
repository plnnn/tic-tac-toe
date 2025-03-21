import { calculateWinner } from './BoardUtility';

function alphaBeta(board, depth, isMaximizing, alpha, beta) {
    const winner = calculateWinner(board);
    if (winner === 'X') return -10 + depth;
    if (winner === 'O') return 10 - depth;
    if (board.every(cell => cell)) return 0;
  
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                const newBoard = board.slice();
                newBoard[i] = 'O';
                let score = alphaBeta(newBoard, depth + 1, false, alpha, beta);

                bestScore = Math.max(bestScore, score);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                const newBoard = board.slice();
                newBoard[i] = 'X';
                let score = alphaBeta(newBoard, depth + 1, true, alpha, beta);

                bestScore = Math.min(bestScore, score);
                beta = Math.min(beta, score);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    }
  }

export function bestMove(board) {
    let bestScore = -Infinity;
    let move = -1;
  
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            const newBoard = board.slice();
            newBoard[i] = 'O';
            let score = alphaBeta(newBoard, 0, false, -Infinity, Infinity);

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

  