import { calculateWinner } from './BoardUtility';

class Node {
    constructor(state, parent = null) {
        this.state = state;
        this.parent = parent;
        this.children = [];
        this.wins = 0;
        this.visits = 0;
    }
  
    isTerminal() {
        return calculateWinner(this.state) !== null || this.state.every(cell => cell !== null);
    }
  
    getUntriedMoves() {
        const moves = [];
        for (let i = 0; i < 9; i++) {
            if (this.state[i] === null) {
                moves.push(i);
            }
        }
        return moves;
    }
  
    getBestChild() {
        let bestChild = null;
        let bestWinRate = -Infinity;

        for (let child of this.children) {
            const winRate = child.wins / child.visits;
            if (winRate > bestWinRate) {
                bestWinRate = winRate;
                bestChild = child;
            }
        }

        return bestChild;
    }
}
  
function simulateGame(board, isAI) {
    let boardCopy = board.slice();
    let currentPlayer = isAI ? 'O' : 'X';

    while (!calculateWinner(boardCopy) && boardCopy.includes(null)) {
        let availableMoves = boardCopy.map((cell, index) => (cell === null ? index : -1)).filter(val => val !== -1);
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        boardCopy[randomMove] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    const winner = calculateWinner(boardCopy);
    if (winner === 'O') return 1;
    if (winner === 'X') return -1;
    return 0;
}

function findPlacedO(board, bestChildState) {
    for (let i = 0; i < 9; i++) {
        if (!board[i] && bestChildState[i] != null) {
            return i;
        }
    }
}
  
export function bestMove(board) {
    let rootNode = new Node(board);
    let simulations = 1000;
  
    for (let i = 0; i < simulations; i++) {
        let node = rootNode;

        while (node.getUntriedMoves().length === 0 && !node.isTerminal()) {
            node = node.getBestChild();
        }

        if (!node.isTerminal()) {
            let untriedMoves = node.getUntriedMoves();
            let move = untriedMoves[Math.floor(Math.random() * untriedMoves.length)];
            let newBoard = node.state.slice();
            newBoard[move] = 'O';
            let childNode = new Node(newBoard, node);
            node.children.push(childNode);
            node = childNode;
        }

        let result = simulateGame(node.state, true);

        while (node !== null) {
            node.visits += 1;
            node.wins += result;
            node = node.parent;
        }
    }
  
    let bestChild = rootNode.getBestChild();
    return findPlacedO(board, bestChild.state);
}
  