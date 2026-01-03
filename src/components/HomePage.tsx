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
  const avatars = [null, null, null, null, null, null];

  // Fallback: If progress is null, initialize it and reload
  if (!progress) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('userProgress');
      window.location.reload();
    }
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
  }

  // Fallback: If avatar is invalid, set to 1
  if (!progress.avatar || progress.avatar < 1 || progress.avatar > avatars.length) {
    progress.avatar = 1;
  }

  return (
    <div className="min-h-[60vh] p-4 max-w-screen-lg mx-auto">
      {/* Hero Section */}
      <div className="rounded-3xl p-8 shadow-2xl mb-8 border" style={{ background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg" style={{ color: 'var(--foreground)' }}>{t.home.welcome}</h1>
            <p className="text-lg font-medium" style={{ color: 'var(--secondary-foreground)' }}>{t.home.subtitle}</p>
          </div>
          {/* Avatar removed for professional look */}
        </div>
        
        <div className="flex gap-4 mt-6">
          <div className="rounded-xl p-3 flex-1 border" style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5" />
              <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{t.home.dailyStreak}</span>
            </div>
            <div className="text-2xl" style={{ color: 'var(--foreground)' }}>{progress.dailyStreak} {t.home.days}</div>
          </div>
          <div className="rounded-xl p-3 flex-1 border" style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5" />
              <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{t.common.level}</span>
            </div>
            <div className="text-2xl" style={{ color: 'var(--foreground)' }}>{progress.level}</div>
          </div>
          <div className="rounded-xl p-3 flex-1 border" style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5" />
              <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{t.common.score}</span>
            </div>
            <div className="text-2xl" style={{ color: 'var(--foreground)' }}>{progress.totalScore}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => onNavigate('games')}
          className="rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all active:scale-95 border"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderColor: 'var(--border)' }}
        >
          <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div className="text-center text-lg font-semibold">{t.home.startLearning}</div>
        </button>
        <button
          onClick={() => onNavigate('progress')}
          className="rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all active:scale-95 border"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderColor: 'var(--border)' }}
        >
          <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center mb-4 mx-auto">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div className="text-center text-lg font-semibold">{t.nav.progress}</div>
        </button>
      </div>

      {/* Learning Avatar */}
      <div className="rounded-2xl p-8 shadow-xl mb-8 border" style={{ background: 'var(--card)', color: 'var(--card-foreground)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-semibold mb-6">Your Learning Avatar</h2>
        <div className="flex items-center gap-6">
          {/* Avatar removed for professional look */}
          <div className="flex-1">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>Vocabulary</span>
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{progress.skills.vocabulary}%</span>
              </div>
              <div className="h-2 bg-blue-900/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 transition-all"
                  style={{ width: `${progress.skills.vocabulary}%` }}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>Logic</span>
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{progress.skills.logic}%</span>
              </div>
              <div className="h-2 bg-green-900/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 transition-all"
                  style={{ width: `${progress.skills.logic}%` }}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>Creativity</span>
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{progress.skills.creativity}%</span>
              </div>
              <div className="h-2 bg-purple-900/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 transition-all"
                  style={{ width: `${progress.skills.creativity}%` }}
                />
              </div>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>Speed</span>
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{progress.skills.speed}%</span>
              </div>
              <div className="h-2 bg-yellow-900/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all"
                  style={{ width: `${progress.skills.speed}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Badges */}
      {progress.badges.length > 0 && (
        <div className="rounded-2xl p-8 shadow-xl border" style={{ background: 'var(--card)', color: 'var(--card-foreground)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--accent)' }}>Recent Badges 🏅</h2>
          <div className="flex gap-3 overflow-x-auto">
            {progress.badges.slice(-5).map((badge, index) => (
              <div
                key={index}
                className="rounded-xl p-4 min-w-[120px] text-center border"
                style={{ background: 'var(--background)', color: 'var(--accent)', borderColor: 'var(--border)' }}
              >
                <div className="text-3xl mb-2">{badge}</div>
                <div className="text-xs font-medium">Achievement</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
