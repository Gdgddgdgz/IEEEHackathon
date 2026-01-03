import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { quizQuestions } from '../../utils/gameData';
import { updateSkill } from '../../utils/storage';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  onBack: () => void;
}

interface Answer {
  questionIndex: number;
  selectedAnswer: number;
  wasCorrect: boolean;
}

export function TimeTravelGame({ onBack }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [pastAnswers, setPastAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { t } = useLanguage();

  const totalQuestions = 15;
  
  // Get difficulty based on past performance
  const getQuestionDifficulty = () => {
    const recentAnswers = pastAnswers.slice(-3);
    const recentCorrect = recentAnswers.filter((a) => a.wasCorrect).length;
    
    if (recentCorrect >= 2) {
      return 3; // Harder questions
    } else if (recentCorrect === 1) {
      return 2; // Medium questions
    } else {
      return 1; // Easier questions
    }
  };

  const difficulty = getQuestionDifficulty();
  const availableQuestions = quizQuestions.filter((q) => q.difficulty === difficulty);
  const question = availableQuestions[currentQuestion % availableQuestions.length] || quizQuestions[0];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === question.correctAnswer;
    
    const newAnswer: Answer = {
      questionIndex: currentQuestion,
      selectedAnswer: answerIndex,
      wasCorrect: isCorrect,
    };
    
    setPastAnswers([...pastAnswers, newAnswer]);

    if (isCorrect) {
      setScore(score + (difficulty * 10));
      updateSkill('logic', difficulty);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Game complete
        alert(`Time Travel Complete! Final Score: ${score}`);
        onBack();
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl">Time Travel Questions ⏳</h1>
          <p className="text-sm text-gray-600">Question {currentQuestion + 1} / {totalQuestions}</p>
        </div>
        <div className="bg-indigo-100 px-4 py-2 rounded-lg">
          <span className="text-sm">Score: {score}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-indigo-600" />
          <span>Your Journey Timeline</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(totalQuestions)].map((_, i) => {
            const answer = pastAnswers.find((a) => a.questionIndex === i);
            return (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                  i === currentQuestion
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-200'
                    : answer
                    ? answer.wasCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Adaptive Difficulty Indicator */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <span>Current Difficulty:</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-3 h-6 rounded ${
                  level <= difficulty ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {difficulty === 1 && '🌱 Building foundation - keep it up!'}
          {difficulty === 2 && '🌿 Getting stronger - good progress!'}
          {difficulty === 3 && '🌳 Master level - excellent work!'}
        </p>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="mb-2">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            {question.subject}
          </span>
        </div>
        
        <h3 className="text-xl mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                showFeedback
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
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
              selectedAnswer === question.correctAnswer
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {selectedAnswer === question.correctAnswer ? (
              <div>
                <p className="mb-2">✅ Correct! +{difficulty * 10} points</p>
                <p className="text-sm">
                  Your performance is improving! Next question will match your level.
                </p>
              </div>
            ) : (
              <div>
                <p className="mb-2">❌ Incorrect</p>
                <p className="text-sm">
                  Correct answer: {question.options[question.correctAnswer]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-6">
        <h3 className="mb-2">⏰ How Time Travel Works:</h3>
        <p className="text-sm text-gray-700">
          Your past answers affect future questions! Answer correctly to get harder questions and more points.
          Wrong answers will give you easier questions to help you learn better.
        </p>
      </div>
    </div>
  );
}
