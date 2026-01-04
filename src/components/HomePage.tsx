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
    return <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>Loading...</div>;
  }

  // Fallback: If avatar is invalid, set to 1
  if (!progress.avatar || progress.avatar < 1 || progress.avatar > avatars.length) {
    progress.avatar = 1;
  }

  return (
    /* FIX: Changed min-h-[60vh] to min-h-screen and added w-full.
       Added background: 'var(--background)' here to ensure NO white spaces on the sides or bottom.
    */
    <div className="min-h-screen w-full p-0 m-0 transition-colors duration-300" style={{ background: 'var(--background)' }}>
      
      {/* Centered Content Wrapper */}
      <div className="max-w-screen-lg mx-auto p-4 pb-32">
        
        {/* Hero Section */}
        <div className="rounded-3xl p-8 shadow-2xl mb-8 border mt-4" style={{ background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 drop-shadow-lg" style={{ color: 'var(--foreground)' }}>{t.home.welcome}</h1>
              <p className="text-lg font-medium" style={{ color: 'var(--secondary-foreground)' }}>{t.home.subtitle}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="rounded-xl p-3 flex-1 min-w-[120px] border" style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{t.home.dailyStreak}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{progress.dailyStreak} {t.home.days}</div>
            </div>
            
            <div className="rounded-xl p-3 flex-1 min-w-[120px] border" style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{t.common.level}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{progress.level}</div>
            </div>
            
            <div className="rounded-xl p-3 flex-1 min-w-[120px] border" style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-blue-500" />
                <span className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{t.common.score}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{progress.totalScore}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => onNavigate('games')}
            className="rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all active:scale-95 border group"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderColor: 'var(--border)' }}
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div className="text-center text-lg font-bold uppercase tracking-wider">{t.home.startLearning}</div>
          </button>
          
          <button
            onClick={() => onNavigate('progress')}
            className="rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all active:scale-95 border group"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderColor: 'var(--border)' }}
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div className="text-center text-lg font-bold uppercase tracking-wider">{t.nav.progress}</div>
          </button>
        </div>

        {/* Learning Avatar Stats */}
        <div className="rounded-2xl p-8 shadow-xl mb-8 border" style={{ background: 'var(--card)', color: 'var(--card-foreground)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-semibold mb-6">Your Learning Progress</h2>
          <div className="space-y-6">
            {Object.entries(progress.skills).map(([skill, value]) => (
              <div key={skill}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-70" style={{ color: 'var(--foreground)' }}>{skill}</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{value}%</span>
                </div>
                <div className="h-3 bg-black/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Badges */}
        {progress.badges.length > 0 && (
          <div className="rounded-2xl p-8 shadow-xl border" style={{ background: 'var(--card)', color: 'var(--card-foreground)', borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Recent Badges 🏅</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {progress.badges.slice(-5).map((badge, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4 min-w-[120px] text-center border bg-white/5"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="text-4xl mb-2 drop-shadow-md">{badge}</div>
                  <div className="text-[10px] font-black uppercase opacity-50">Achievement</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}