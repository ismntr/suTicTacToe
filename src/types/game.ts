export type Player = 'X' | 'O' | null;
export type Theme = 'classic' | 'modern';
export type Difficulty = 'easy' | 'pro' | 'impossible';
export type Screen = 'home' | 'game' | 'settings';

export interface GameState {
  board: Player[];
  currentPlayer: Player;
  winner: Player;
  score: {
    playerX: number;
    playerO: number;
    draws: number;
  };
  moveHistory: string[];
}

export interface Settings {
  theme: Theme;
  soundEnabled: boolean;
  difficulty: Difficulty;
  customColors: {
    x: string;
    o: string;
  };
}
