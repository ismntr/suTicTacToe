import { RotateCcw, Home } from 'lucide-react';
import type { Player, Theme } from '../types/game';

interface GameBoardProps {
  board: Player[];
  currentPlayer: Player;
  score: { playerX: number; playerO: number; draws: number };
  moveHistory: string[];
  theme: Theme;
  customColors: { x: string; o: string };
  onCellClick: (index: number) => void;
  onReset: () => void;
  onHome: () => void;
}

export function GameBoard({
  board,
  currentPlayer,
  score,
  moveHistory,
  theme,
  customColors,
  onCellClick,
  onReset,
  onHome,
}: GameBoardProps) {
  const renderCellContent = (player: Player) => {
    if (!player) return null;

    if (theme === 'classic') {
      if (player === 'X') {
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto">
            <line
              x1="15"
              y1="15"
              x2="45"
              y2="45"
              stroke={customColors.x}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="45"
              y1="15"
              x2="15"
              y2="45"
              stroke={customColors.x}
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        );
      } else {
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto">
            <circle
              cx="30"
              cy="30"
              r="18"
              stroke={customColors.o}
              strokeWidth="6"
              fill="none"
            />
          </svg>
        );
      }
    } else {
      // Modern theme
      if (player === 'X') {
        return (
          <div className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center" style={{ backgroundColor: customColors.x }}>
            <svg width="32" height="32" viewBox="0 0 32 32">
              <line x1="8" y1="8" x2="24" y2="24" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <line x1="24" y1="8" x2="8" y2="24" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
        );
      } else {
        return (
          <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: customColors.o }}>
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800"></div>
          </div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 transition-colors duration-300">
      <div className="flex flex-col gap-6 w-full max-w-md mx-auto my-auto">
        {/* Scoreboard */}
        <div className="glass rounded-[24px] p-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <div className={`flex-1 text-center p-3 rounded-[12px] transition-all border-2 ${
              currentPlayer === 'X' 
                ? 'glow bg-white/40 dark:bg-slate-800/60 border-indigo-500' 
                : 'border-transparent'
            }`}>
              <p className="text-indigo-600 dark:text-indigo-400 mb-1 font-bold">Su (X)</p>
              <p className="text-xl dark:text-white">{score.playerX}</p>
            </div>
            <div className="px-4">
              <p className="text-slate-400 dark:text-slate-500 font-bold">vs</p>
            </div>
            <div className={`flex-1 text-center p-3 rounded-[12px] transition-all border-2 ${
              currentPlayer === 'O' 
                ? 'glow bg-white/40 dark:bg-slate-800/60 border-indigo-500' 
                : 'border-transparent'
            }`}>
              <p className="text-slate-500 dark:text-slate-400 mb-1 font-bold">AI (O)</p>
              <p className="text-xl dark:text-white">{score.playerO}</p>
            </div>
          </div>
          <div className="text-center pt-3 border-t border-slate-200 dark:border-slate-700/50">
            <p className="text-slate-500 dark:text-slate-400">Beraberlik: {score.draws}</p>
          </div>
        </div>

        {/* Game Grid */}
        <div className="glass rounded-[24px] p-8 flex justify-center overflow-hidden border border-white/20">
          <div className="relative w-[300px] h-[300px]">
            {/* Traditional Grid Lines */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Vertical Lines */}
              <div className="absolute left-[100px] top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700" />
              <div className="absolute left-[200px] top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700" />
              {/* Horizontal Lines */}
              <div className="absolute top-[100px] left-0 right-0 h-[2px] bg-slate-200 dark:bg-slate-700" />
              <div className="absolute top-[200px] left-0 right-0 h-[2px] bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="grid grid-cols-3 w-full h-full relative z-10">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => onCellClick(index)}
                  className="w-[100px] h-[100px] hover:bg-indigo-500/5 dark:hover:bg-white/5 transition-all active:scale-95 flex items-center justify-center disabled:cursor-default"
                  disabled={cell !== null}
                >
                  {renderCellContent(cell)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Move History & Actions */}
        <div className="glass rounded-[24px] p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-indigo-600 dark:text-indigo-400">Hamle Geçmişi</h2>
            <div className="flex gap-2">
              <button
                onClick={onReset}
                className="p-3 bg-white/40 dark:bg-slate-800/40 rounded-[12px] hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
                title="Sıfırla"
              >
                <RotateCcw size={24} strokeWidth={2} className="text-indigo-600 dark:text-indigo-400" />
              </button>
              <button
                onClick={onHome}
                className="p-3 bg-white/40 dark:bg-slate-800/40 rounded-[12px] hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
                title="Ana Menü"
              >
                <Home size={24} strokeWidth={2} className="text-slate-500 dark:text-slate-400" />
              </button>
            </div>
          </div>
          <div className="max-h-32 overflow-y-auto space-y-2 scrollbar-hide">
            {moveHistory.length === 0 ? (
              <p className="text-slate-400 dark:text-slate-500 text-center py-4 italic">Henüz hamle yok</p>
            ) : (
              moveHistory.map((move, index) => (
                <div key={index} className="text-slate-600 dark:text-slate-300 py-2 px-3 bg-white/30 dark:bg-slate-800/30 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  {move.replace('X', 'Su')}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}