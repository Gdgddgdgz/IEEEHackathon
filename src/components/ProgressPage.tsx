import React from 'react';
import { Trophy, Star, TrendingUp, Award, Flame } from 'lucide-react';
import { getUserProgress } from '../utils/storage';
import { BADGES } from '../utils/gameData';
import { useLanguage } from '../utils/LanguageContext';

export function ProgressPage() {
  const progress = getUserProgress();
  const { t } = useLanguage();

  const skillData = [
    { name: 'Vocabulary', value: progress.skills.vocabulary, color: 'bg-blue-500', icon: '📚' },
    { name: 'Logic', value: progress.skills.logic, color: 'bg-green-500', icon: '🧠' },
    { name: 'Creativity', value: progress.skills.creativity, color: 'bg-purple-500', icon: '🎨' },
    { name: 'Speed', value: progress.skills.speed, color: 'bg-yellow-500', icon: '⚡' },
  ];

  return (
    /* OUTER CONTAINER: Forces the background to the edges of the screen */
    <div className="w-full min-h-screen m-0 p-0 transition-colors duration-300" style={{ background: 'var(--background)' }}>
      
      {/* INNER CONTENT: Centered for readability */}
      <div className="max-w-screen-lg mx-auto p-6 pb-32">
        
        <header className="mb-10 pt-4">
          <h1 className="text-4xl font-black mb-2 tracking-tight" style={{ color: 'var(--foreground)' }}>
            Your Progress
          </h1>
          <p className="text-lg font-medium opacity-70" style={{ color: 'var(--foreground)' }}>
            Tracking your journey to mastery
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Level', value: progress.level, icon: Trophy, color: 'text-yellow-500' },
            { label: 'Total Score', value: progress.totalScore, icon: Star, color: 'text-blue-500' },
            { label: 'Day Streak', value: progress.dailyStreak, icon: Flame, color: 'text-orange-500' },
            { label: 'Badges', value: progress.badges.length, icon: Award, color: 'text-purple-500' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="rounded-3xl p-6 shadow-xl border transition-transform hover:scale-105"
              style={{ background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-3xl font-black">{stat.value}</span>
              </div>
              <p className="text-xs font-black uppercase tracking-widest opacity-50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Skill Tree & Avatar Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Skill Tree */}
          <div className="rounded-[32px] p-8 shadow-2xl border" style={{ background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-purple-500" />
              Skill Tree
            </h2>
            <div className="space-y-6">
              {skillData.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{skill.icon}</span>
                      <span className="font-bold uppercase tracking-tight text-sm opacity-80">{skill.name}</span>
                    </div>
                    <span className="font-black text-sm">{skill.value}%</span>
                  </div>
                  <div className="h-4 bg-black/10 rounded-full overflow-hidden p-1">
                    <div
                      className={`h-full ${skill.color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Avatar Evolution */}
          <div className="rounded-[32px] p-8 shadow-2xl border flex flex-col justify-center overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', color: 'white', borderColor: 'transparent' }}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Evolution Rank</h2>
              <p className="text-5xl font-black mb-4 tracking-tighter">
                {progress.level < 5 ? 'Beginner' : progress.level < 10 ? 'Scholar' : 'Master'}
              </p>
              <p className="opacity-90 text-sm mb-8 max-w-[200px] leading-relaxed">
                {progress.level < 5
                  ? 'The journey of a thousand miles begins with a single step. Keep going!'
                  : progress.level < 10
                  ? 'Your dedication is paying off. You are becoming a true scholar!'
                  : 'You have reached the pinnacle of learning mastery!'}
              </p>
              
              <div className="bg-white/20 rounded-full h-4 overflow-hidden mb-2">
                <div
                  className="h-full bg-white transition-all duration-1000"
                  style={{ width: `${((progress.level % 5) / 5) * 100}%` }}
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                {progress.level % 5} / 5 Points to Next Evolution
              </p>
            </div>
            {/* Background Decoration */}
            <Award className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 rotate-12" />
          </div>
        </div>

        {/* Badges Collection */}
        <div className="rounded-[32px] p-8 shadow-xl mb-10 border" style={{ background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Award className="w-7 h-7 text-yellow-500" />
            Badge Collection
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {BADGES.map((badge) => {
              const earned = progress.badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl p-4 border-2 transition-all flex flex-col items-center justify-center text-center ${
                    earned
                      ? 'shadow-lg scale-100 border-yellow-400/50 bg-gradient-to-b from-yellow-50 to-white'
                      : 'opacity-30 grayscale border-transparent bg-black/5'
                  }`}
                  style={earned ? { color: '#854d0e' } : { color: 'var(--foreground)' }}
                >
                  <div className="text-4xl mb-3 drop-shadow-sm">{badge.icon}</div>
                  <h3 className="text-[10px] font-black uppercase leading-tight mb-1">{badge.name}</h3>
                  {earned && <div className="w-1 h-1 rounded-full bg-yellow-500 mt-2" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Games Progress */}
        <div className="rounded-[32px] p-8 shadow-xl border" style={{ background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-blue-500" />
            Game Statistics
          </h2>
          
          {Object.keys(progress.gamesProgress).length === 0 ? (
            <div className="text-center py-12 opacity-50">
              <p className="text-lg italic font-medium">Start playing games to see your stats here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {Object.entries(progress.gamesProgress).map(([gameId, gameProgress]) => (
                <div key={gameId} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="capitalize font-bold text-lg">{gameId.replace('-', ' ')}</span>
                    <span className="text-xs font-black uppercase tracking-widest opacity-50">
                      Best: {gameProgress.highScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
                        style={{ width: `${Math.min(100, (gameProgress.currentLevel / 10) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold opacity-70">Lv. {gameProgress.currentLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}