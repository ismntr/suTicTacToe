import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import type { Difficulty } from '../types/game';

interface SettingsScreenProps {
  soundEnabled: boolean;
  difficulty: Difficulty;
  customColors: { x: string; o: string };
  onSoundToggle: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onColorChange: (player: 'x' | 'o', color: string) => void;
  onBack: () => void;
}

export function SettingsScreen({
  soundEnabled,
  difficulty,
  customColors,
  onSoundToggle,
  onDifficultyChange,
  onColorChange,
  onBack,
}: SettingsScreenProps) {
  const colorPresets = [
    { name: 'Indigo', color: '#6366F1' },
    { name: 'Purple', color: '#8B5CF6' },
    { name: 'Pink', color: '#EC4899' },
    { name: 'Red', color: '#EF4444' },
    { name: 'Orange', color: '#F97316' },
    { name: 'Green', color: '#10B981' },
    { name: 'Blue', color: '#3B82F6' },
    { name: 'Slate', color: '#64728B' },
  ];

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex flex-col gap-6 w-full max-w-md mx-auto my-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 glass rounded-[12px] hover:bg-white/60 transition-all active:scale-95 border border-white/50"
          >
            <ArrowLeft size={24} strokeWidth={2} className="text-[#6366F1]" />
          </button>
          <h1 className="text-indigo-600">Ayarlar</h1>
        </div>

        {/* Sound Toggle */}
        <div className="glass rounded-[24px] p-6 border border-white/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 size={24} strokeWidth={2} className="text-[#6366F1]" />
              ) : (
                <VolumeX size={24} strokeWidth={2} className="text-[#64728B]" />
              )}
              <div>
                <p className="text-[#6366F1] font-semibold">Ses Efektleri</p>
                <p className="text-xs text-[#64728B] mt-1">
                  {soundEnabled ? 'Açık' : 'Kapalı'}
                </p>
              </div>
            </div>
            <button
              onClick={onSoundToggle}
              className={`relative w-14 h-8 rounded-full transition-all ${
                soundEnabled ? 'bg-[#6366F1]' : 'bg-[#E2E8F0]'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${
                  soundEnabled ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Difficulty Levels */}
        <div className="glass rounded-[24px] p-6 border border-white/50">
          <p className="text-[#6366F1] mb-4 font-semibold">Zorluk Seviyesi</p>
          <div className="flex flex-col gap-3">
            {(['easy', 'pro', 'impossible'] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => onDifficultyChange(level)}
                className={`py-3 px-4 rounded-[12px] text-left transition-all ${
                  difficulty === level
                    ? 'bg-[#6366F1] text-white shadow-lg shadow-indigo-100'
                    : 'bg-white/40 text-[#64728B] hover:bg-white/60'
                }`}
              >
                <span className="capitalize">{level === 'easy' ? 'Kolay' : level === 'pro' ? 'Profesyonel' : 'İmkansız'}</span>
                {level === 'easy' && (
                  <span className="text-xs ml-2 opacity-70">- Rastgele hamleler</span>
                )}
                {level === 'pro' && (
                  <span className="text-xs ml-2 opacity-70">- Stratejik oyun</span>
                )}
                {level === 'impossible' && (
                  <span className="text-xs ml-2 opacity-70">- Yenilmez AI</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors for X */}
        <div className="glass rounded-[24px] p-6 border border-white/50">
          <p className="text-[#6366F1] mb-4 font-semibold">Su (X) Rengi</p>
          <div className="grid grid-cols-4 gap-3">
            {colorPresets.map((preset) => (
              <button
                key={`x-${preset.color}`}
                onClick={() => onColorChange('x', preset.color)}
                className={`aspect-square rounded-[12px] transition-all hover:scale-110 ${
                  customColors.x === preset.color ? 'ring-4 ring-[#6366F1]' : ''
                }`}
                style={{ backgroundColor: preset.color }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {/* Custom Colors for O */}
        <div className="glass rounded-[24px] p-6 border border-white/50">
          <p className="text-[#6366F1] mb-4 font-semibold">Yapay Zeka (O) Rengi</p>
          <div className="grid grid-cols-4 gap-3">
            {colorPresets.map((preset) => (
              <button
                key={`o-${preset.color}`}
                onClick={() => onColorChange('o', preset.color)}
                className={`aspect-square rounded-[12px] transition-all hover:scale-110 ${
                  customColors.o === preset.color ? 'ring-4 ring-[#6366F1]' : ''
                }`}
                style={{ backgroundColor: preset.color }}
                title={preset.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}