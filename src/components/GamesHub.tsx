import React, { useState } from 'react';
import { BookOpen, BookMarked, TrendingUp, Image, Swords, Search, Link, Clock, Lock, ArrowLeft } from 'lucide-react';
import { GAMES_LIST, getUserProgress } from '../utils/storage';
import { ParallelSentenceGame } from './games/ParallelSentenceGame';
import { StoryBuilderGame } from './games/StoryBuilderGame';
import { ConceptLadderGame } from './games/ConceptLadderGame';
import { VisualWordGame } from './games/VisualWordGame';
import { QuizBattleGame } from './games/QuizBattleGame';
import { ErrorDetectiveGame } from './games/ErrorDetectiveGame';
import { MatchMeaningGame } from './games/MatchMeaningGame';
import { TimeTravelGame } from './games/TimeTravelGame';
import { useLanguage } from '../utils/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  BookMarked: <BookMarked className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Image: <Image className="w-6 h-6" />,
  Swords: <Swords className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  Link: <Link className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
};

export function GamesHub() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const progress = getUserProgress();
  const { t } = useLanguage();

  const renderGame = () => {
    switch (selectedGame) {
      case 'parallel-sentence':
        return <ParallelSentenceGame onBack={() => setSelectedGame(null)} />;
      case 'story-builder':
        return <StoryBuilderGame onBack={() => setSelectedGame(null)} />;
      case 'concept-ladder':
        return <ConceptLadderGame onBack={() => setSelectedGame(null)} />;
      case 'visual-word':
        return <VisualWordGame onBack={() => setSelectedGame(null)} />;
      case 'quiz-battle':
        return <QuizBattleGame onBack={() => setSelectedGame(null)} />;
      case 'error-detective':
        return <ErrorDetectiveGame onBack={() => setSelectedGame(null)} />;
      case 'match-meaning':
        return <MatchMeaningGame onBack={() => setSelectedGame(null)} />;
      case 'time-travel':
        return <TimeTravelGame onBack={() => setSelectedGame(null)} />;
      default:
        return null;
    }
  };

  if (selectedGame) {
    return (
      /* Ensures the specific game also fills the screen */
      <div className="w-full min-h-screen" style={{ background: 'var(--background)' }}>
        {renderGame()}
      </div>
    );
  }

  return (
    /* OUTER CONTAINER: Forces background color to all 4 edges of the screen */
    <div className="w-full min-h-screen m-0 p-0 transition-colors duration-300" style={{ background: 'var(--background)' }}>
      
      {/* INNER CONTENT: Centers the content but allows background to bleed to edges */}
      <div className="max-w-screen-lg mx-auto p-6 pb-32">
        
        <div className="mb-10 pt-4">
          <h1 className="text-4xl font-black mb-2 tracking-tight" style={{ color: 'var(--foreground)' }}>
            Learning Games
          </h1>
          <p className="text-lg font-medium opacity-70" style={{ color: 'var(--foreground)' }}>
            Choose a quest to build your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAMES_LIST.map((game) => {
            const isLocked = progress.level < game.unlockLevel;
            const gameProgress = progress.gamesProgress[game.id];
            
            return (
              <button
                key={game.id}
                onClick={() => !isLocked && setSelectedGame(game.id)}
                disabled={isLocked}
                className={`relative rounded-3xl p-8 shadow-xl text-left transition-all border ${
                  isLocked
                    ? 'opacity-50 grayscale cursor-not-allowed'
                    : 'hover:shadow-2xl hover:-translate-y-1 active:scale-95 cursor-pointer'
                }`}
                style={{ 
                  background: 'var(--card)', 
                  color: 'var(--foreground)', 
                  borderColor: 'var(--border)' 
                }}
              >
                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-black/10 rounded-full p-2 backdrop-blur-sm">
                      <Lock className="w-5 h-5 opacity-60" />
                    </div>
                  </div>
                )}

                {/* Game Icon */}
                <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {iconMap[game.icon]}
                </div>

                {/* Game Info */}
                <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                <p className="opacity-60 text-sm mb-6 leading-relaxed">{game.description}</p>

                {/* Progress Bar (Only show if unlocked and has progress) */}
                {!isLocked && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        Lv. {gameProgress?.currentLevel || 1}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        Best: {gameProgress?.highScore || 0}
                      </span>
                    </div>
                    <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${game.color}`}
                        style={{ width: `${Math.min(100, ((gameProgress?.currentLevel || 1) / 10) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Unlock Status / Play Button */}
                {isLocked ? (
                  <div className="text-xs font-black uppercase tracking-widest opacity-40">
                    Unlock at Level {game.unlockLevel}
                  </div>
                ) : (
                  <div className={`inline-flex items-center gap-2 ${game.color} text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:brightness-110 transition-all`}>
                    {t.common.play} <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Tips Section - Professional Card Style */}
        <div 
          className="mt-12 rounded-[32px] p-8 border shadow-lg" 
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Pro Tips 💡</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-sm font-medium opacity-80" style={{ color: 'var(--foreground)' }}>
                  • Play different games to develop all skill areas equally.
                </p>
             </div>
             <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                <p className="text-sm font-medium opacity-80" style={{ color: 'var(--foreground)' }}>
                  • Maintaining your daily streak earns you bonus XP multipliers.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}