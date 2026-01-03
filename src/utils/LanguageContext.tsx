import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  nav: {
    home: string;
    games: string;
    progress: string;
    teacher: string;
    settings: string;
  };
  home: {
    welcome: string;
    subtitle: string;
    dailyStreak: string;
    days: string;
    startLearning: string;
    continueQuest: string;
  };
  games: {
    parallelSentence: string;
    storyBuilder: string;
    conceptLadder: string;
    visualToWord: string;
    quizBattle: string;
    errorDetective: string;
    matchMeaning: string;
    timeTravel: string;
  };
  common: {
    level: string;
    score: string;
    start: string;
    next: string;
    submit: string;
    correct: string;
    incorrect: string;
    tryAgain: string;
    completed: string;
    locked: string;
    play: string;
    back: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      games: 'Games',
      progress: 'Progress',
      teacher: 'Teacher',
      settings: 'Settings',
    },
    home: {
      welcome: 'Welcome Back!',
      subtitle: 'Continue your learning journey',
      dailyStreak: 'Daily Streak',
      days: 'days',
      startLearning: 'Start Learning',
      continueQuest: 'Continue Quest',
    },
    games: {
      parallelSentence: 'Parallel Sentence',
      storyBuilder: 'Story Builder',
      conceptLadder: 'Concept Ladder',
      visualToWord: 'Visual to Word',
      quizBattle: 'Quiz Battle',
      errorDetective: 'Error Detective',
      matchMeaning: 'Match Meaning',
      timeTravel: 'Time Travel',
    },
    common: {
      level: 'Level',
      score: 'Score',
      start: 'Start',
      next: 'Next',
      submit: 'Submit',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      tryAgain: 'Try Again',
      completed: 'Completed',
      locked: 'Locked',
      play: 'Play',
      back: 'Back',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      games: 'खेल',
      progress: 'प्रगति',
      teacher: 'शिक्षक',
      settings: 'सेटिंग्स',
    },
    home: {
      welcome: 'वापसी पर स्वागत है!',
      subtitle: 'अपनी सीखने की यात्रा जारी रखें',
      dailyStreak: 'दैनिक श्रृंखला',
      days: 'दिन',
      startLearning: 'सीखना शुरू करें',
      continueQuest: 'खोज जारी रखें',
    },
    games: {
      parallelSentence: 'समानांतर वाक्य',
      storyBuilder: 'कहानी निर्माता',
      conceptLadder: 'अवधारणा सीढ़ी',
      visualToWord: 'चित्र से शब्द',
      quizBattle: 'क्विज युद्ध',
      errorDetective: 'त्रुटि जासूस',
      matchMeaning: 'अर्थ मिलान',
      timeTravel: 'समय यात्रा',
    },
    common: {
      level: 'स्तर',
      score: 'अंक',
      start: 'शुरू करें',
      next: 'अगला',
      submit: 'जमा करें',
      correct: 'सही!',
      incorrect: 'गलत',
      tryAgain: 'पुनः प्रयास करें',
      completed: 'पूर्ण',
      locked: 'बंद',
      play: 'खेलें',
      back: 'वापस',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'en' || stored === 'hi')) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
