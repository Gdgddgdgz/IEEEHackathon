import React, { useState } from 'react';
import { MixedQuizRoom } from './MixedQuizRoom';
import { BarChart3, Users, TrendingUp, Award, Download, Upload } from 'lucide-react';
import { getUserProgress } from '../utils/storage';

export function TeacherPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'content'>('overview');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quiz, setQuiz] = useState<any>(null);
  const progress = getUserProgress();

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h3>Total Students</h3>
          </div>
          <p className="text-3xl">1</p>
          <p className="text-sm text-gray-600 mt-1">Active learners</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3>Avg. Progress</h3>
          </div>
          <p className="text-3xl">{progress.level}</p>
          <p className="text-sm text-gray-600 mt-1">Average level</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-6 h-6 text-yellow-600" />
            <h3>Badges Earned</h3>
          </div>
          <p className="text-3xl">{progress.badges.length}</p>
          <p className="text-sm text-gray-600 mt-1">Total achievements</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p>Current student completed Story Builder Level 1</p>
              <p className="text-sm text-gray-600">Today</p>
            </div>
            <span className="text-green-600">Done</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p>Maintained {progress.dailyStreak} day streak</p>
              <p className="text-sm text-gray-600">Ongoing</p>
            </div>
            <span className="text-orange-600">Active</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl mb-4">Skill Heatmap</h3>
        <p className="text-sm text-gray-600 mb-4">
          Visual representation of student strengths and areas for improvement
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${progress.skills.vocabulary > 50 ? 'bg-green-100' : 'bg-red-100'}`}>
            <h4>Vocabulary</h4>
            <p className="text-2xl">{progress.skills.vocabulary}%</p>
          </div>

          <div className={`p-4 rounded-lg ${progress.skills.logic > 50 ? 'bg-green-100' : 'bg-red-100'}`}>
            <h4>Logic</h4>
            <p className="text-2xl">{progress.skills.logic}%</p>
          </div>

          <div className={`p-4 rounded-lg ${progress.skills.creativity > 50 ? 'bg-green-100' : 'bg-red-100'}`}>
            <h4>Creativity</h4>
            <p className="text-2xl">{progress.skills.creativity}%</p>
          </div>

          <div className={`p-4 rounded-lg ${progress.skills.speed > 50 ? 'bg-green-100' : 'bg-red-100'}`}>
            <h4>Speed</h4>
            <p className="text-2xl">{progress.skills.speed}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl mb-4">Topic-wise Performance</h3>
        <div className="space-y-3">
          {Object.entries(progress.gamesProgress).map(([gameId, gameProgress]) => (
            <div key={gameId}>
              <div className="flex items-center justify-between mb-2">
                <span className="capitalize">{gameId.replace('-', ' ')}</span>
                <span className="text-sm text-gray-600">
                  Level {gameProgress.currentLevel}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    gameProgress.currentLevel > 5 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min(100, (gameProgress.currentLevel / 10) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl mb-4">Quiz Builder</h3>
        <p className="text-sm text-gray-600 mb-4">
          Create custom quizzes for your students
        </p>

        <div className="space-y-3">
          {/* ...existing subject/topic/number fields... */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
            onClick={() => {
              setQuiz({
                id: 'test-quiz',
                title: 'Mixed Test Quiz',
                questions: [
                  {
                    question: 'What is the capital of France?',
                    options: ['Berlin', 'London', 'Paris', 'Rome'],
                    correctAnswer: 2,
                  },
                  {
                    question: '2 + 2 = ?',
                    options: ['3', '4', '5', '6'],
                    correctAnswer: 1,
                  },
                  {
                    question: 'Water boils at ___ °C?',
                    options: ['90', '100', '110', '120'],
                    correctAnswer: 1,
                  },
                ],
              });
              setShowQuiz(true);
            }}
          >
            Start Mixed Quiz (Test)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl mb-4">Voice Notes</h3>
        <p className="text-sm text-gray-600 mb-4">
          Record explanations for students (stored offline)
        </p>

        <div className="space-y-3">
          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            Start Recording
          </button>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500 text-sm">No recordings yet</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl mb-4">Offline Sync</h3>
        <p className="text-sm text-gray-600 mb-4">
          Share content via Bluetooth or hotspot
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" />
            Export Data
          </button>

          <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Import Data
          </button>
        </div>
      </div>
    </div>
  );

  if (showQuiz && quiz) {
    return <MixedQuizRoom quiz={quiz} onEnd={() => setShowQuiz(false)} />;
  }

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto pb-20">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Teacher Panel</h1>
        <p className="text-gray-600">Manage content and monitor student progress</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'performance'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'content'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Content
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'performance' && renderPerformance()}
      {activeTab === 'content' && renderContent()}
    </div>
  );
}
