import type { Player, Difficulty } from '../types/game';

export function checkWinner(board: Player[]): Player {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check for draw
  if (board.every((cell) => cell !== null)) {
    return null; // Draw
  }

  return undefined; // Game continues
}

export function getAIMove(board: Player[], difficulty: Difficulty): number {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null) as number[];

  if (availableMoves.length === 0) return -1;

  if (difficulty === 'easy') {
    // Random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  } else if (difficulty === 'pro') {
    // Strategic play - try to win or block
    // Check if AI can win
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'O';
      if (checkWinner(testBoard) === 'O') return move;
    }

    // Check if need to block player
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'X';
      if (checkWinner(testBoard) === 'X') return move;
    }

    // Take center if available
    if (board[4] === null) return 4;

    // Take corner
    const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  } else {
    // Impossible - Minimax algorithm
    return minimax(board, 'O').index;
  }
}

function minimax(
  board: Player[],
  player: Player
): { index: number; score: number } {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null) as number[];

  const winner = checkWinner(board);
  if (winner === 'O') return { index: -1, score: 10 };
  if (winner === 'X') return { index: -1, score: -10 };
  if (availableMoves.length === 0) return { index: -1, score: 0 };

  const moves: { index: number; score: number }[] = [];

  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = player;

    const result = minimax(testBoard, player === 'O' ? 'X' : 'O');
    moves.push({ index: move, score: result.score });
  }

  let bestMove: { index: number; score: number };
  if (player === 'O') {
    // Maximizing player
    let bestScore = -Infinity;
    for (const move of moves) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  } else {
    // Minimizing player
    let bestScore = Infinity;
    for (const move of moves) {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  }

  return bestMove!;
}

export function getCellPosition(index: number): string {
  const positions = [
    'Top-Left',
    'Top-Center',
    'Top-Right',
    'Middle-Left',
    'Center',
    'Middle-Right',
    'Bottom-Left',
    'Bottom-Center',
    'Bottom-Right',
  ];
  return positions[index];
}
