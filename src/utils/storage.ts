// LocalStorage management for offline-first app

export interface UserProgress {
  userId: string;
  name: string;
  avatar: number;
  dailyStreak: number;
  lastLoginDate: string;
  totalScore: number;
  level: number;
  skills: {
    vocabulary: number;
    logic: number;
    creativity: number;
    speed: number;
  };
  badges: string[];
  gamesProgress: {
    [gameId: string]: {
      currentLevel: number;
      highScore: number;
      completed: boolean;
      lastPlayed: string;
    };
  };
  completedDays: number[];
}

export interface GameData {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: string;
  unlockLevel: number;
  color: string;
}

export function initializeData() {
  // Initialize user progress if not exists
  if (!localStorage.getItem('userProgress')) {
    const initialProgress: UserProgress = {
      userId: 'student1',
      name: 'Student',
      avatar: 1,
      dailyStreak: 0,
      lastLoginDate: '',
      totalScore: 0,
      level: 1,
      skills: {
        vocabulary: 0,
        logic: 0,
        creativity: 0,
        speed: 0,
      },
      badges: [],
      gamesProgress: {},
      completedDays: [],
    };
    localStorage.setItem('userProgress', JSON.stringify(initialProgress));
  }

  // Update daily streak
  updateDailyStreak();
}

export function getUserProgress(): UserProgress {
  const data = localStorage.getItem('userProgress');
  return data ? JSON.parse(data) : null;
}

export function saveUserProgress(progress: UserProgress) {
  localStorage.setItem('userProgress', JSON.stringify(progress));
}

export function updateDailyStreak() {
  const progress = getUserProgress();
  if (!progress) return;

  const today = new Date().toDateString();
  const lastLogin = progress.lastLoginDate;

  if (lastLogin !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastLogin === yesterday) {
      progress.dailyStreak += 1;
    } else if (lastLogin !== '') {
      progress.dailyStreak = 1;
    } else {
      progress.dailyStreak = 1;
    }
    progress.lastLoginDate = today;
    saveUserProgress(progress);
  }
}

export function updateGameProgress(gameId: string, level: number, score: number) {
  const progress = getUserProgress();
  if (!progress) return;

  if (!progress.gamesProgress[gameId]) {
    progress.gamesProgress[gameId] = {
      currentLevel: 1,
      highScore: 0,
      completed: false,
      lastPlayed: new Date().toISOString(),
    };
  }

  const gameProgress = progress.gamesProgress[gameId];
  gameProgress.currentLevel = Math.max(gameProgress.currentLevel, level);
  gameProgress.highScore = Math.max(gameProgress.highScore, score);
  gameProgress.lastPlayed = new Date().toISOString();

  progress.totalScore += score;
  
  saveUserProgress(progress);
}

export function addBadge(badgeId: string) {
  const progress = getUserProgress();
  if (!progress) return;

  if (!progress.badges.includes(badgeId)) {
    progress.badges.push(badgeId);
    saveUserProgress(progress);
  }
}

export function updateSkill(skillType: keyof UserProgress['skills'], points: number) {
  const progress = getUserProgress();
  if (!progress) return;

  progress.skills[skillType] = Math.min(100, progress.skills[skillType] + points);
  
  // Level up based on total skill points
  const totalSkills = Object.values(progress.skills).reduce((a, b) => a + b, 0);
  progress.level = Math.floor(totalSkills / 50) + 1;
  
  saveUserProgress(progress);
}

export function markDayCompleted(day: number) {
  const progress = getUserProgress();
  if (!progress) return;

  if (!progress.completedDays.includes(day)) {
    progress.completedDays.push(day);
    saveUserProgress(progress);
  }
}

export const GAMES_LIST: GameData[] = [
  {
    id: 'parallel-sentence',
    name: 'Parallel Sentence',
    type: 'language',
    description: 'Match sentences with similar meanings',
    icon: 'BookOpen',
    unlockLevel: 1,
    color: 'bg-blue-500',
  },
  {
    id: 'story-builder',
    name: 'Story Builder Quest',
    type: 'creativity',
    description: 'Arrange sentences to build stories',
    icon: 'BookMarked',
    unlockLevel: 1,
    color: 'bg-purple-500',
  },
  {
    id: 'concept-ladder',
    name: 'Concept Ladder',
    type: 'logic',
    description: 'Climb the ladder of knowledge',
    icon: 'TrendingUp',
    unlockLevel: 2,
    color: 'bg-green-500',
  },
  {
    id: 'visual-word',
    name: 'Visual to Word',
    type: 'vocabulary',
    description: 'Match images with words',
    icon: 'Image',
    unlockLevel: 2,
    color: 'bg-yellow-500',
  },
  {
    id: 'quiz-battle',
    name: 'Quiz Battle Arena',
    type: 'speed',
    description: 'Battle against time and AI',
    icon: 'Swords',
    unlockLevel: 3,
    color: 'bg-red-500',
  },
  {
    id: 'error-detective',
    name: 'Error Detective',
    type: 'logic',
    description: 'Find and fix mistakes',
    icon: 'Search',
    unlockLevel: 3,
    color: 'bg-orange-500',
  },
  {
    id: 'match-meaning',
    name: 'Match the Meaning',
    type: 'vocabulary',
    description: 'Connect words to meanings',
    icon: 'Link',
    unlockLevel: 4,
    color: 'bg-pink-500',
  },
  {
    id: 'time-travel',
    name: 'Time Travel Questions',
    type: 'logic',
    description: 'Past choices affect future',
    icon: 'Clock',
    unlockLevel: 5,
    color: 'bg-indigo-500',
  },
];
