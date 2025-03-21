export function randomMove(board) {
    let availableMoves = board
        .map((cell, index) => (cell === null ? index : null))
        .filter(index => index !== null);
  
    return availableMoves.length > 0
        ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
        : -1;
}