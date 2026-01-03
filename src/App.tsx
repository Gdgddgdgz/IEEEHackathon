import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Trophy, Settings, Users, BarChart3 } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { GamesHub } from './components/GamesHub';
import { ProgressPage } from './components/ProgressPage';
import { TeacherPanel } from './components/TeacherPanel';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';
import { initializeData, getUserProgress } from './utils/storage';
import { LanguageProvider, useLanguage } from './utils/LanguageContext';

type Page = 'home' | 'games' | 'progress' | 'teacher' | 'settings';


function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [role, setRole] = useState<'' | 'teacher' | 'student'>('');
  const [dark, setDark] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    initializeData();
  }, []);

  // Apply dark mode to <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [dark]);

  const handleLogout = () => {
    setRole('');
    setIsTeacherMode(false);
    setCurrentPage('home');
    setDark(false);
  };

  if (!role) {
    return <LoginPage onLogin={(r) => {
      setRole(r);
      setIsTeacherMode(r === 'teacher');
      setCurrentPage('home');
    }} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'games':
        return <GamesHub />;
      case 'progress':
        return <ProgressPage />;
      case 'teacher':
        return role === 'teacher' ? <TeacherPanel /> : <HomePage onNavigate={setCurrentPage} />;
      case 'settings':
        return <SettingsPage isTeacherMode={isTeacherMode} setIsTeacherMode={setIsTeacherMode} dark={dark} setDark={setDark} onLogout={handleLogout} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-200 dark:border-slate-700 shadow-sm sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-3">
          <img src="/logo192.png" alt="App Logo" className="h-8 w-8 rounded-lg shadow" style={{background:'#2a3cff'}} onError={e => (e.currentTarget as HTMLImageElement).style.display='none'} />
          <span className="font-bold text-xl tracking-tight text-blue-700 dark:text-blue-200">Student Learning App</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 pt-4">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 border-t border-gray-200 dark:border-slate-700 shadow-2xl z-40">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentPage === 'home' ? 'text-blue-700 dark:text-blue-200 font-semibold' : 'text-gray-500 dark:text-gray-300'
              }`}
              aria-label="Home"
            >
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs">{t.nav.home}</span>
            </button>
            <button
              onClick={() => setCurrentPage('games')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentPage === 'games' ? 'text-blue-700 dark:text-blue-200 font-semibold' : 'text-gray-500 dark:text-gray-300'
              }`}
              aria-label="Games"
            >
              <BookOpen className="w-6 h-6 mb-1" />
              <span className="text-xs">{t.nav.games}</span>
            </button>
            <button
              onClick={() => setCurrentPage('progress')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentPage === 'progress' ? 'text-blue-700 dark:text-blue-200 font-semibold' : 'text-gray-500 dark:text-gray-300'
              }`}
              aria-label="Progress"
            >
              <Trophy className="w-6 h-6 mb-1" />
              <span className="text-xs">{t.nav.progress}</span>
            </button>
            {role === 'teacher' && (
              <button
                onClick={() => setCurrentPage('teacher')}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  currentPage === 'teacher' ? 'text-blue-700 dark:text-blue-200 font-semibold' : 'text-gray-500 dark:text-gray-300'
                }`}
                aria-label="Teacher Panel"
              >
                <BarChart3 className="w-6 h-6 mb-1" />
                <span className="text-xs">{t.nav.teacher}</span>
              </button>
            )}
            <button
              onClick={() => setCurrentPage('settings')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentPage === 'settings' ? 'text-blue-700 dark:text-blue-200 font-semibold' : 'text-gray-500 dark:text-gray-300'
              }`}
              aria-label="Settings"
            >
              <Settings className="w-6 h-6 mb-1" />
              <span className="text-xs">{t.nav.settings}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <footer className="w-full bg-white/80 dark:bg-slate-900/80 border-t border-gray-200 dark:border-slate-700 text-center text-xs text-gray-500 dark:text-gray-300 py-2 mt-2 z-10">
        <span>&copy; {new Date().getFullYear()} Student Learning App. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
