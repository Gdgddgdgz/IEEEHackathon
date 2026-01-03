import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Trophy, Settings, Users, BarChart3 } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { GamesHub } from './components/GamesHub';
import { ProgressPage } from './components/ProgressPage';
import { TeacherPanel } from './components/TeacherPanel';
import { SettingsPage } from './components/SettingsPage';
import { initializeData, getUserProgress } from './utils/storage';
import { LanguageProvider, useLanguage } from './utils/LanguageContext';

type Page = 'home' | 'games' | 'progress' | 'teacher' | 'settings';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    initializeData();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'games':
        return <GamesHub />;
      case 'progress':
        return <ProgressPage />;
      case 'teacher':
        return <TeacherPanel />;
      case 'settings':
        return <SettingsPage isTeacherMode={isTeacherMode} setIsTeacherMode={setIsTeacherMode} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <main className="pb-20">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">{t.nav.home}</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('games')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentPage === 'games' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <BookOpen className="w-5 h-5 mb-1" />
              <span className="text-xs">{t.nav.games}</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('progress')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentPage === 'progress' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Trophy className="w-5 h-5 mb-1" />
              <span className="text-xs">{t.nav.progress}</span>
            </button>
            
            {isTeacherMode && (
              <button
                onClick={() => setCurrentPage('teacher')}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  currentPage === 'teacher' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <BarChart3 className="w-5 h-5 mb-1" />
                <span className="text-xs">{t.nav.teacher}</span>
              </button>
            )}
            
            <button
              onClick={() => setCurrentPage('settings')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentPage === 'settings' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs">{t.nav.settings}</span>
            </button>
          </div>
        </div>
      </nav>
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
