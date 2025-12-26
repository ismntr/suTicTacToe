import { Settings } from 'lucide-react';
import type { Theme } from '../types/game';

interface HomeScreenProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onStartGame: () => void;
  onOpenSettings: () => void;
}

export function HomeScreen({ theme, onThemeChange, onStartGame, onOpenSettings }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-300">
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        {/* Welcome Text */}
        <div className="text-center space-y-2">
          <h1 className="text-indigo-600 dark:text-indigo-400">Merhaba Su!</h1>
          <p className="text-slate-500 dark:text-slate-400">Hazırsan oyuna başlayalım mı?</p>
        </div>

        {/* Game Icon */}
        <div className="glass rounded-[24px] p-12 w-full flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
            {/* Grid Lines */}
            <line x1="40" y1="10" x2="40" y2="110" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" className="dark:stroke-indigo-400" />
            <line x1="80" y1="10" x2="80" y2="110" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" className="dark:stroke-indigo-400" />
            <line x1="10" y1="40" x2="110" y2="40" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" className="dark:stroke-indigo-400" />
            <line x1="10" y1="80" x2="110" y2="80" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" className="dark:stroke-indigo-400" />
            
            {/* X in top-left */}
            <line x1="15" y1="15" x2="35" y2="35" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" className="dark:stroke-indigo-400" />
            <line x1="35" y1="15" x2="15" y2="35" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" className="dark:stroke-indigo-400" />
            
            {/* O in center */}
            <circle cx="60" cy="60" r="15" stroke="#64728B" strokeWidth="4" fill="none" className="dark:stroke-slate-400" />
            
            {/* X in bottom-right */}
            <line x1="85" y1="85" x2="105" y2="105" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" className="dark:stroke-indigo-400" />
            <line x1="105" y1="85" x2="85" y2="105" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" className="dark:stroke-indigo-400" />
          </svg>
        </div>

        <h1>Tic-Tac-Toe</h1>

        {/* Theme Toggle */}
        <div className="glass rounded-[12px] p-2 flex gap-2 w-full">
          <button
            onClick={() => onThemeChange('classic')}
            className={`flex-1 py-3 rounded-[12px] transition-all ${
              theme === 'classic'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-transparent text-slate-500 dark:text-slate-400'
            }`}
          >
            Klasik
          </button>
          <button
            onClick={() => onThemeChange('modern')}
            className={`flex-1 py-3 rounded-[12px] transition-all ${
              theme === 'modern'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-transparent text-slate-500 dark:text-slate-400'
            }`}
          >
            Modern
          </button>
        </div>

        {/* Start Game Button */}
        <button
          onClick={onStartGame}
          className="w-full py-4 bg-indigo-600 text-white rounded-[12px] hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          Oyuna Başla
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Settings size={24} strokeWidth={2} />
          <span>Ayarlar</span>
        </button>
      </div>
    </div>
  );
}