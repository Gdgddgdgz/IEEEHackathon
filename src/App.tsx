import React, { useState, useEffect } from "react";
import { Home, BookOpen, Trophy, Settings, BarChart3 } from "lucide-react";

import { HomePage } from "./components/HomePage";
import { GamesHub } from "./components/GamesHub";
import { ProgressPage } from "./components/ProgressPage";
import { TeacherPanel } from "./components/TeacherPanel";
import { SettingsPage } from "./components/SettingsPage";
import AuthCard from "./components/AuthCard";

import { isAuthenticated, logout } from "./utils/auth";
import { initializeData } from "./utils/storage";
import { LanguageProvider, useLanguage } from "./utils/LanguageContext";

export type Page = "home" | "games" | "progress" | "teacher" | "settings";
type Role = "" | "student" | "teacher";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [role, setRole] = useState<Role>("");
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [dark, setDark] = useState(false);
  const [auth, setAuth] = useState<boolean>(isAuthenticated());

  const { t } = useLanguage();

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
  }, [dark]);

  const handleLogout = () => {
    logout();
    setAuth(false);
    setRole("");
    setIsTeacherMode(false);
    setCurrentPage("home");
    setDark(false);
  };

  /* Auth Screen with professional card */
  if (!auth) {
    return (
      <div className="flex flex-col items-center h-screen bg-gradient-to-br from-purple-200 via-indigo-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="mt-16 w-full max-w-2xl p-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl border-4 border-purple-400 dark:border-purple-600">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-5xl font-extrabold text-purple-700 dark:text-purple-300">
              Verbora
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-2 text-center">
              Learn meaning, not memorization
            </p>
          </div>
          <AuthCard
            onAuth={(r: "student" | "teacher") => {
              setAuth(true);
              setRole(r);
              setIsTeacherMode(r === "teacher");
              setCurrentPage("home");
            }}
          />
        </div>
      </div>
    );
  }

  /* Page Background Gradients */
  const pageBg = () => {
    switch (currentPage) {
      case "home":
        return "from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700";
      case "games":
        return "from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700";
      case "progress":
        return "from-green-100 via-lime-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700";
      case "teacher":
        return "from-red-100 via-orange-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700";
      case "settings":
        return "from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700";
      default:
        return "from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700";
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "games":
        return <GamesHub />;
      case "progress":
        return <ProgressPage />;
      case "teacher":
        return role === "teacher" ? <TeacherPanel /> : <HomePage onNavigate={setCurrentPage} />;
      case "settings":
        return (
          <SettingsPage
            isTeacherMode={isTeacherMode}
            setIsTeacherMode={setIsTeacherMode}
            dark={dark}
            setDark={setDark}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`h-screen flex flex-col bg-gradient-to-br ${pageBg()} transition-colors duration-700`}>
      {/* Header */}
      <header className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-md flex items-center px-5 py-2">
        <span className="font-extrabold text-2xl md:text-3xl text-purple-700 dark:text-purple-300">
          Verbora
        </span>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          {renderPage()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="h-20 bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-700 shadow-lg flex justify-around items-center rounded-t-2xl">
        <NavButton
          active={currentPage === "home"}
          icon={<Home className="w-6 h-6 mb-1 text-purple-600" />}
          label={t.nav.home}
          onClick={() => setCurrentPage("home")}
        />
        <NavButton
          active={currentPage === "games"}
          icon={<BookOpen className="w-6 h-6 mb-1 text-pink-500" />}
          label={t.nav.games}
          onClick={() => setCurrentPage("games")}
        />
        <NavButton
          active={currentPage === "progress"}
          icon={<Trophy className="w-6 h-6 mb-1 text-yellow-500" />}
          label={t.nav.progress}
          onClick={() => setCurrentPage("progress")}
        />
        {role === "teacher" && (
          <NavButton
            active={currentPage === "teacher"}
            icon={<BarChart3 className="w-6 h-6 mb-1 text-green-500" />}
            label={t.nav.teacher}
            onClick={() => setCurrentPage("teacher")}
          />
        )}
        <NavButton
          active={currentPage === "settings"}
          icon={<Settings className="w-6 h-6 mb-1 text-blue-500" />}
          label={t.nav.settings}
          onClick={() => setCurrentPage("settings")}
        />
      </nav>

      {/* Footer */}
      <footer className="h-6 w-full text-center text-xs md:text-sm text-gray-500 dark:text-gray-300">
        © {new Date().getFullYear()} Verbora. All rights reserved.
      </footer>
    </div>
  );
}

/* Reusable Nav Button */
function NavButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 rounded-2xl
      ${
        active
          ? "bg-gradient-to-t from-purple-300 to-pink-200 dark:from-gray-700 dark:to-gray-600 text-purple-800 dark:text-purple-300 font-semibold shadow-lg scale-105"
          : "text-gray-500 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      <span className="text-sm md:text-base">{label}</span>
    </button>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
