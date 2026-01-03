import React, { useState, useEffect } from 'react';
import { validateAnswer } from '../../utils/semanticMatch';
import { ArrowLeft, Zap, Brain } from 'lucide-react';
import { quizQuestions } from '../../utils/gameData';
import { updateSkill } from '../../utils/storage';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  onBack: () => void;
}

type GameMode = 'menu' | 'vsAI' | 'vsPlayer';

export function QuizBattleGame({ onBack }: Props) {
  const [mode, setMode] = useState<GameMode>('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const { t } = useLanguage();

  const totalQuestions = 10;
  const currentQuestion = quizQuestions[currentQuestionIndex % quizQuestions.length];

  useEffect(() => {
    if (mode !== 'menu' && !showFeedback && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      // Time's up
      handleAnswer(null);
    }
  }, [timeLeft, showFeedback, mode]);

  const handleAnswer = (answerIndex: number | null) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    // Accept multiple correct answers (array)
    const correctOption = currentQuestion.options[currentQuestion.correctAnswer];
    const acceptable = Array.isArray(correctOption) ? correctOption : [correctOption];
    const userOption = answerIndex !== null ? currentQuestion.options[answerIndex] : '';
    const { isMatch, isExact, bestMatch, suggestions: simSuggestions } = validateAnswer(userOption, acceptable);
    const isCorrect = isMatch;

    if (isCorrect) {
      const points = Math.max(5, Math.floor(timeLeft / 3) * 5);
      setPlayerScore(playerScore + points);
      updateSkill('speed', 2);
      setFeedbackMsg(isExact ? `Correct! +${points} points` : "You're very close! That's an acceptable answer.");
      setSuggestions([]);
    } else {
      if (simSuggestions.length > 0) {
        setFeedbackMsg("Almost! Try a synonym or check your spelling.");
        setSuggestions(simSuggestions);
      } else {
        setFeedbackMsg(`Incorrect. Correct answer: ${Array.isArray(correctOption) ? correctOption[0] : correctOption}`);
        setSuggestions([]);
      }
    }

    // AI logic (60% correct rate on average)
    if (mode === 'vsAI') {
      const aiCorrect = Math.random() > 0.4;
      if (aiCorrect) {
        const aiPoints = Math.floor(Math.random() * 10) + 5;
        setAiScore(aiScore + aiPoints);
      }
    }

    setTimeout(() => {
      const newAnswered = questionsAnswered + 1;
      setQuestionsAnswered(newAnswered);
      if (newAnswered >= totalQuestions) {
        // Game over
        alert(
          mode === 'vsAI'
            ? `Game Over! Your score: ${playerScore}, AI score: ${aiScore}`
            : `Game Over! Your score: ${playerScore}`
        );
        setMode('menu');
        resetGame();
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(15);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setFeedbackMsg('');
        setSuggestions([]);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setPlayerScore(0);
    setAiScore(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuestionsAnswered(0);
  };

  const startGame = (gameMode: GameMode) => {
    setMode(gameMode);
    resetGame();
  };

  if (mode === 'menu') {
    return (
      <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Quiz Battle Arena ⚔️</h1>
          <div></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl mb-4">Choose Battle Mode:</h2>
          
          <button
            onClick={() => startGame('vsAI')}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 hover:shadow-xl transition-all active:scale-95"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="w-8 h-8" />
              <span className="text-2xl">vs AI</span>
            </div>
            <p className="opacity-90">Battle against smart AI opponent</p>
          </button>
          
          <button
            onClick={() => startGame('vsPlayer')}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-8 hover:shadow-xl transition-all active:scale-95"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-8 h-8" />
              <span className="text-2xl">Solo Speed Run</span>
            </div>
            <p className="opacity-90">Answer questions as fast as you can</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMode('menu')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl">Quiz Battle ⚔️</h1>
          <p className="text-sm text-gray-600">
            Question {questionsAnswered + 1} / {totalQuestions}
          </p>
        </div>
        <div></div>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-500 text-white rounded-xl p-4">
          <p className="text-sm mb-1">You</p>
          <p className="text-2xl">{playerScore}</p>
        </div>
        {mode === 'vsAI' && (
          <div className="bg-red-500 text-white rounded-xl p-4">
            <p className="text-sm mb-1">AI</p>
            <p className="text-2xl">{aiScore}</p>
          </div>
        )}
      </div>

      {/* Timer */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Time Left:</span>
          <span className={`text-2xl ${timeLeft <= 5 ? 'text-red-600' : 'text-green-600'}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              timeLeft <= 5 ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="mb-2">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            {currentQuestion.subject}
          </span>
        </div>
        
        <h3 className="text-xl mb-6">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                showFeedback
                  ? index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white'
                  : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <span className="mr-3 text-gray-500">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`mt-4 p-4 rounded-xl ${
              feedbackMsg.includes('Correct') || feedbackMsg.includes('close')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <p className="mb-2">{feedbackMsg}</p>
            {suggestions.length > 0 && (
              <p className="text-sm">Other possible answers: {suggestions.join(', ')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
