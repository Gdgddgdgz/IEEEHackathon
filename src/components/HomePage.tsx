import React from 'react';
import { Flame, Trophy, Target, Star, TrendingUp } from 'lucide-react';
import { getUserProgress } from '../utils/storage';
import { useLanguage } from '../utils/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  let progress = getUserProgress();
  const { t } = useLanguage();
  const avatars = ['🧑‍🎓', '👧', '👦', '🧒', '👨‍🎓', '👩‍🎓'];

  // Fallback: If progress is null, initialize it and reload
  if (!progress) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('userProgress');
      window.location.reload();
    }
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Fallback: If avatar is invalid, set to 1
  if (!progress.avatar || progress.avatar < 1 || progress.avatar > avatars.length) {
    progress.avatar = 1;
  }

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-2">{t.home.welcome}</h1>
            <p className="opacity-90">{t.home.subtitle}</p>
          </div>
          <div className="text-6xl">{avatars[progress.avatar - 1]}</div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <div className="bg-white/20 rounded-xl p-3 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5" />
              <span className="text-sm">{t.home.dailyStreak}</span>
            </div>
            <div className="text-2xl">{progress.dailyStreak} {t.home.days}</div>
          </div>
          
          <div className="bg-white/20 rounded-xl p-3 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5" />
              <span className="text-sm">{t.common.level}</span>
            </div>
            <div className="text-2xl">{progress.level}</div>
          </div>
          
          <div className="bg-white/20 rounded-xl p-3 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5" />
              <span className="text-sm">{t.common.score}</span>
            </div>
            <div className="text-2xl">{progress.totalScore}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => onNavigate('games')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-center">{t.home.startLearning}</div>
        </button>
        
        <button
          onClick={() => onNavigate('progress')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 mx-auto">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-center">{t.nav.progress}</div>
        </button>
      </div>

      {/* Learning Avatar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <h2 className="text-xl mb-4">Your Learning Avatar</h2>
        <div className="flex items-center gap-4">
          <div className="text-7xl">{avatars[progress.avatar - 1]}</div>
          <div className="flex-1">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Vocabulary 📚</span>
                <span className="text-sm">{progress.skills.vocabulary}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${progress.skills.vocabulary}%` }}
                />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Logic 🧠</span>
                <span className="text-sm">{progress.skills.logic}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${progress.skills.logic}%` }}
                />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Creativity 🎨</span>
                <span className="text-sm">{progress.skills.creativity}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all"
                  style={{ width: `${progress.skills.creativity}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Speed ⚡</span>
                <span className="text-sm">{progress.skills.speed}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${progress.skills.speed}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Badges */}
      {progress.badges.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl mb-4">Recent Badges 🏅</h2>
          <div className="flex gap-3 overflow-x-auto">
            {progress.badges.slice(-5).map((badge, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 min-w-[120px] text-center"
              >
                <div className="text-3xl mb-2">{badge}</div>
                <div className="text-xs">Achievement</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
