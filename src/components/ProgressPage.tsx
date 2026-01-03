import React from 'react';
import { Trophy, Star, TrendingUp, Award, Flame } from 'lucide-react';
import { getUserProgress } from '../utils/storage';
import { BADGES } from '../utils/gameData';
import { useLanguage } from '../utils/LanguageContext';

export function ProgressPage() {
  const progress = getUserProgress();
  const { t } = useLanguage();

  const skillData = [
    { name: 'Vocabulary', value: progress.skills.vocabulary, color: 'bg-blue-500', icon: '' },
    { name: 'Logic', value: progress.skills.logic, color: 'bg-green-500', icon: '' },
    { name: 'Creativity', value: progress.skills.creativity, color: 'bg-purple-500', icon: '' },
    { name: 'Speed', value: progress.skills.speed, color: 'bg-yellow-500', icon: '' },
  ];

  return (
    <div className="min-h-[60vh] p-4 max-w-screen-lg mx-auto pb-20">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 drop-shadow">Your Progress</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-2xl">{progress.level}</span>
          </div>
          <p className="text-sm text-gray-600">Level</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-blue-500" />
            <span className="text-2xl">{progress.totalScore}</span>
          </div>
          <p className="text-sm text-gray-600">Total Score</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-2xl">{progress.dailyStreak}</span>
          </div>
          <p className="text-sm text-gray-600">Day Streak</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-purple-500" />
            <span className="text-2xl">{progress.badges.length}</span>
          </div>
          <p className="text-sm text-gray-600">Badges</p>
        </div>
      </div>

      {/* Skill Tree */}
      <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8 border border-purple-100">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-purple-700">
          <TrendingUp className="w-7 h-7" />
          Skill Tree
        </h2>
        
        <div className="space-y-4">
          {skillData.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
                <span className="text-sm">{skill.value}%</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${skill.color} transition-all duration-500`}
                  style={{ width: `${skill.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Village Hero Badges
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const earned = progress.badges.includes(badge.id);
            
            return (
              <div
                key={badge.id}
                className={`rounded-xl p-4 border-2 transition-all ${
                  earned
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-400'
                    : 'bg-gray-100 border-gray-300 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2 text-center">{badge.icon}</div>
                <h3 className="text-center mb-1">{badge.name}</h3>
                <p className="text-xs text-center text-gray-600">{badge.description}</p>
                {!earned && (
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Not yet earned
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Avatar Evolution */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6 shadow-lg mb-6">
        <h2 className="text-xl mb-4">Learning Avatar</h2>
        
        <div className="flex items-center gap-6">
          <div className="text-8xl">
            {/* Avatar removed for professional look */}
          </div>
          <div className="flex-1">
            <p className="text-2xl mb-2">
              {progress.level < 5 ? 'Beginner' : progress.level < 10 ? 'Scholar' : 'Master'}
            </p>
            <p className="opacity-90 text-sm mb-3">
              {progress.level < 5
                ? 'Keep learning to evolve!'
                : progress.level < 10
                ? 'You\'re making great progress!'
                : 'You\'ve become a learning master!'}
            </p>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${((progress.level % 5) / 5) * 100}%` }}
              />
            </div>
            <p className="text-xs mt-1 opacity-75">
              {progress.level % 5}/5 to next evolution
            </p>
          </div>
        </div>
      </div>

      {/* Games Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl mb-4">Games Progress</h2>
        
        {Object.keys(progress.gamesProgress).length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Start playing games to see your progress here!
          </p>
        ) : (
          <div className="space-y-4">
            {Object.entries(progress.gamesProgress).map(([gameId, gameProgress]) => (
              <div key={gameId} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="capitalize">{gameId.replace('-', ' ')}</span>
                  <span className="text-sm text-gray-600">
                    Level {gameProgress.currentLevel} • High Score: {gameProgress.highScore}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                    style={{ width: `${Math.min(100, (gameProgress.currentLevel / 10) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
