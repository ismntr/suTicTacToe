import { Trophy, Medal } from 'lucide-react';
import type { Player } from '../types/game';

interface WinnerModalProps {
  winner: Player;
  score: { playerX: number; playerO: number; draws: number };
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export function WinnerModal({ winner, score, onPlayAgain, onMainMenu }: WinnerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass rounded-[24px] p-8 w-full max-w-sm animate-scale-in">
        <div className="flex flex-col items-center gap-6">
          {/* Trophy Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
            {winner ? (
              <Trophy size={48} strokeWidth={2} className="text-white" />
            ) : (
              <Medal size={48} strokeWidth={2} className="text-white" />
            )}
          </div>

          {/* Winner Text */}
          <div className="text-center">
            <h1 className="mb-2">
              {winner ? (winner === 'X' ? 'Su Kazandı!' : 'Yapay Zeka Kazandı!') : "Berabere!"}
            </h1>
            <p className="text-[#64728B]">
              {winner ? (winner === 'X' ? 'Harika oynadın Su!' : 'Bir dahaki sefere daha iyi şanslar') : 'Dostluk kazandı'}
            </p>
          </div>

          {/* Score Display */}
          <div className="w-full bg-white/40 rounded-[12px] p-4 grid grid-cols-3 gap-4 border border-white/50">
            <div className="text-center">
              <p className="text-[#6366F1] mb-1">Su</p>
              <p className="text-xl font-bold">{score.playerX}</p>
            </div>
            <div className="text-center">
              <p className="text-[#64728B] mb-1">Beraberlik</p>
              <p className="text-xl font-bold">{score.draws}</p>
            </div>
            <div className="text-center">
              <p className="text-[#64728B] mb-1">AI</p>
              <p className="text-xl font-bold">{score.playerO}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={onPlayAgain}
              className="w-full py-4 bg-[#6366F1] text-white rounded-[12px] hover:bg-[#5558E3] transition-all active:scale-95 shadow-lg shadow-indigo-200"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={onMainMenu}
              className="w-full py-4 border-2 border-indigo-100 text-[#6366F1] rounded-[12px] hover:bg-[#6366F1]/5 transition-all active:scale-95"
            >
              Ana Menü
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}