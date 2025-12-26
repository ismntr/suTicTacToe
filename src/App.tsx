import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { GameBoard } from './components/GameBoard';
import { WinnerModal } from './components/WinnerModal';
import { SettingsScreen } from './components/SettingsScreen';
import { checkWinner, getAIMove, getCellPosition } from './utils/gameLogic';
import type { Player, Theme, Difficulty, Screen, GameState, Settings } from './types/game';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: undefined,
    score: { playerX: 0, playerO: 0, draws: 0 },
    moveHistory: [],
  });
  const [settings, setSettings] = useState<Settings>({
    theme: 'classic',
    soundEnabled: true,
    difficulty: 'pro',
    customColors: { x: '#6366F1', o: '#64728B' },
  });
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  // AI Move Effect
  useEffect(() => {
    if (
      currentScreen === 'game' &&
      gameState.currentPlayer === 'O' &&
      gameState.winner === undefined &&
      !gameState.board.every((cell) => cell !== null)
    ) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(gameState.board, settings.difficulty);
        if (aiMove !== -1) {
          handleMove(aiMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.board, currentScreen]);

  // Check Winner Effect
  useEffect(() => {
    if (currentScreen === 'game') {
      const winner = checkWinner(gameState.board);
      if (winner !== undefined) {
        setGameState((prev) => ({ ...prev, winner }));
        
        // Update score
        setGameState((prev) => {
          const newScore = { ...prev.score };
          if (winner === 'X') newScore.playerX++;
          else if (winner === 'O') newScore.playerO++;
          else newScore.draws++;
          return { ...prev, score: newScore };
        });
        
        setShowWinnerModal(true);
      }
    }
  }, [gameState.board, currentScreen]);

  const handleMove = (index: number) => {
    if (gameState.board[index] || gameState.winner !== undefined) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const playerName = gameState.currentPlayer === 'X' ? 'Su' : 'AI';
    const moveText = `${playerName} → ${getCellPosition(index)}`;
    const newHistory = [...gameState.moveHistory, moveText];

    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      moveHistory: newHistory,
    });
  };

  const handleStartGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: undefined,
      score: gameState.score,
      moveHistory: [],
    });
    setShowWinnerModal(false);
    setCurrentScreen('game');
  };

  const handleResetGame = () => {
    setGameState({
      ...gameState,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: undefined,
      moveHistory: [],
    });
    setShowWinnerModal(false);
  };

  const handlePlayAgain = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: undefined,
      score: gameState.score,
      moveHistory: [],
    });
    setShowWinnerModal(false);
  };

  const handleMainMenu = () => {
    setCurrentScreen('home');
    setShowWinnerModal(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark-mode bg-slate-900' : 'bg-slate-50'}`}>
      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 glass rounded-full shadow-lg hover:scale-110 transition-all active:scale-95 border border-white/20"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="text-yellow-400" size={24} />
          ) : (
            <Moon className="text-slate-600" size={24} />
          )}
        </button>
      </div>

      {currentScreen === 'home' && (
        <HomeScreen
          theme={settings.theme}
          onThemeChange={(theme) => setSettings({ ...settings, theme })}
          onStartGame={handleStartGame}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )}

      {currentScreen === 'game' && (
        <>
          <GameBoard
            board={gameState.board}
            currentPlayer={gameState.currentPlayer}
            score={gameState.score}
            moveHistory={gameState.moveHistory}
            theme={settings.theme}
            customColors={settings.customColors}
            onCellClick={handleMove}
            onReset={handleResetGame}
            onHome={handleMainMenu}
          />
          {showWinnerModal && (
            <WinnerModal
              winner={gameState.winner!}
              score={gameState.score}
              onPlayAgain={handlePlayAgain}
              onMainMenu={handleMainMenu}
            />
          )}
        </>
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen
          soundEnabled={settings.soundEnabled}
          difficulty={settings.difficulty}
          customColors={settings.customColors}
          onSoundToggle={() =>
            setSettings({ ...settings, soundEnabled: !settings.soundEnabled })
          }
          onDifficultyChange={(difficulty) =>
            setSettings({ ...settings, difficulty })
          }
          onColorChange={(player, color) =>
            setSettings({
              ...settings,
              customColors: { ...settings.customColors, [player]: color },
            })
          }
          onBack={() => setCurrentScreen('home')}
        />
      )}
    </div>
  );
}