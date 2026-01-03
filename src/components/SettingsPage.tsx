import React, { useState } from 'react';
import { Globe, Volume2, Moon, Wifi, Users, BookOpen, Trash2 } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { getUserProgress, saveUserProgress } from '../utils/storage';

interface SettingsPageProps {
  isTeacherMode: boolean;
  setIsTeacherMode: (value: boolean) => void;
  dark?: boolean;
  setDark?: (d: boolean) => void;
  onLogout?: () => void;
}

export function SettingsPage({ isTeacherMode, setIsTeacherMode, dark, setDark, onLogout }: SettingsPageProps) {
  const { language, setLanguage } = useLanguage();
  const [readAloud, setReadAloud] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const progress = getUserProgress();

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleChangeAvatar = () => {
    const newAvatar = (progress.avatar % 6) + 1;
    progress.avatar = newAvatar;
    saveUserProgress(progress);
    alert('Avatar changed! Refresh to see changes.');
  };

  return (
    <div className="min-h-[60vh] p-4 max-w-screen-lg mx-auto pb-20">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 drop-shadow">Settings</h1>

      {/* Language Settings */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-6 border border-blue-100">
        <div className="flex items-center gap-4 mb-6">
          <Globe className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-semibold">Language</h2>
        </div>
        <p className="text-base text-gray-600 mb-4">
          Choose your preferred language for the app
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`p-4 rounded-xl border-2 transition-all ${
              language === 'en'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div>English</div>
          </button>
          <button
            onClick={() => handleLanguageChange('hi')}
            className={`p-4 rounded-xl border-2 transition-all ${
              language === 'hi'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div>हिंदी (Hindi)</div>
          </button>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-4">
          <Volume2 className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl">Accessibility</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1">Read-Aloud Mode</h3>
              <p className="text-sm text-gray-600">
                Text-to-speech for questions and content
              </p>
            </div>
            <button
              onClick={() => setReadAloud(!readAloud)}
              className={`w-14 h-7 rounded-full transition-all ${
                readAloud ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-all ${
                  readAloud ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1">Dark Mode</h3>
              <p className="text-sm text-gray-600">
                Save battery on low-end devices
              </p>
            </div>
            <button
              onClick={() => setDark && setDark(!dark)}
              className={`w-14 h-7 rounded-full transition-all ${
                dark ? 'bg-indigo-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-all ${
                  dark ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
              {/* Logout Button */}
              {onLogout && (
                <div className="flex justify-end mt-8">
                  <button
                    className="px-6 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 font-semibold"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
        </div>
      </div>

      {/* Offline Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Wifi className="w-6 h-6 text-green-600" />
          <h2 className="text-xl">Offline Mode</h2>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="mb-1">Offline-First</h3>
            <p className="text-sm text-gray-600">
              All content available without internet
            </p>
          </div>
          <button
            onClick={() => setOfflineMode(!offlineMode)}
            className={`w-14 h-7 rounded-full transition-all ${
              offlineMode ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full transition-all ${
                offlineMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            ℹ️ This app works completely offline. All your progress is saved on your device.
            Connect to sync with other devices via Bluetooth or hotspot.
          </p>
        </div>
      </div>

      {/* Teacher Mode */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-orange-600" />
          <h2 className="text-xl">Account Type</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1">Teacher Mode</h3>
            <p className="text-sm text-gray-600">
              Access teacher panel and analytics
            </p>
          </div>
          <button
            onClick={() => setIsTeacherMode(!isTeacherMode)}
            className={`w-14 h-7 rounded-full transition-all ${
              isTeacherMode ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full transition-all ${
                isTeacherMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl">Profile</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-2">Student Name</label>
            <input
              type="text"
              value={progress.name}
              onChange={(e) => {
                progress.name = e.target.value;
                saveUserProgress(progress);
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg"
            />
          </div>

          <button
            onClick={handleChangeAvatar}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all"
          >
            Change Avatar
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
          <h2 className="text-xl">Data Management</h2>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-700 mb-2">Storage Used:</p>
            <p className="text-2xl">
              {Math.round(JSON.stringify(progress).length / 1024)} KB
            </p>
          </div>

          <button
            onClick={handleResetProgress}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all"
          >
            Reset All Progress
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            This will delete all your progress and cannot be undone
          </p>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl mb-3">About This App</h2>
        <div className="space-y-2 text-sm opacity-90">
          <p>• Offline-first learning platform</p>
          <p>• 30+ days of educational content</p>
          <p>• 8 different learning games</p>
          <p>• Multi-language support</p>
          <p>• Built for rural education</p>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs">Version 1.0.0 • Made for students</p>
        </div>
      </div>
    </div>
  );
}
