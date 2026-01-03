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
    return renderGame();
  }

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Learning Games 🎮</h1>
        <p className="text-gray-600">Choose a game to start your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GAMES_LIST.map((game) => {
          const isLocked = progress.level < game.unlockLevel;
          const gameProgress = progress.gamesProgress[game.id];
          
          return (
            <button
              key={game.id}
              onClick={() => !isLocked && setSelectedGame(game.id)}
              disabled={isLocked}
              className={`relative bg-white rounded-2xl p-6 shadow-lg text-left transition-all ${
                isLocked
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:shadow-xl active:scale-95 cursor-pointer'
              }`}
            >
              {/* Lock Overlay */}
              {isLocked && (
                <div className="absolute top-4 right-4">
                  <div className="bg-gray-200 rounded-full p-2">
                    <Lock className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              )}

              {/* Game Icon */}
              <div className={`w-14 h-14 ${game.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                {iconMap[game.icon]}
              </div>

              {/* Game Info */}
              <h3 className="text-xl mb-2">{game.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>

              {/* Progress Bar */}
              {gameProgress && !isLocked && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Level {gameProgress.currentLevel}</span>
                    <span className="text-xs text-gray-500">High Score: {gameProgress.highScore}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${game.color}`}
                      style={{ width: `${Math.min(100, (gameProgress.currentLevel / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Unlock Level */}
              {isLocked && (
                <div className="text-sm text-gray-500">
                  🔒 Unlock at Level {game.unlockLevel}
                </div>
              )}

              {/* Play Button */}
              {!isLocked && (
                <div className={`inline-block ${game.color} text-white px-4 py-2 rounded-lg text-sm`}>
                  {t.common.play} →
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
        <h2 className="text-xl mb-3">💡 Learning Tips</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Play different games to develop all skills</li>
          <li>• Practice daily to maintain your streak</li>
          <li>• Don't worry about mistakes - they help you learn!</li>
          <li>• Unlock new games by leveling up</li>
        </ul>
      </div>
    </div>
  );
}
