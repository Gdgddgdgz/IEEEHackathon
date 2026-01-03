import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { errorQuestions } from '../../utils/gameData';
import { updateSkill } from '../../utils/storage';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  onBack: () => void;
}

export function ErrorDetectiveGame({ onBack }: Props) {
  const [currentDay, setCurrentDay] = useState(1);
  const [score, setScore] = useState(0);
  const [userCorrection, setUserCorrection] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const { t } = useLanguage();

  const currentQuestion = errorQuestions[currentDay - 1];

  const checkAnswer = () => {
    setShowAnswer(true);
    
    // Simple check - if user's correction is close to correct answer
    const similarity = userCorrection.toLowerCase().trim() === currentQuestion.correctSentence.toLowerCase().trim();
    
    if (similarity) {
      setScore(score + 15);
      updateSkill('logic', 3);
      
      setTimeout(() => {
        if (currentDay < errorQuestions.length) {
          setCurrentDay(currentDay + 1);
          setUserCorrection('');
          setShowAnswer(false);
        }
      }, 2500);
    }
  };

  const skipToNext = () => {
    if (currentDay < errorQuestions.length) {
      setCurrentDay(currentDay + 1);
      setUserCorrection('');
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl">Error Detective 🔍</h1>
          <p className="text-sm text-gray-600">Day {currentDay} / {errorQuestions.length}</p>
        </div>
        <div className="bg-orange-100 px-4 py-2 rounded-lg">
          <span className="text-sm">Score: {score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all"
            style={{ width: `${(currentDay / errorQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Type Badge */}
      <div className="mb-4">
        <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
          Error Type: {currentQuestion.errorType}
        </span>
      </div>

      {/* Incorrect Sentence */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-5 h-5 text-red-600" />
          <h3 className="text-red-800">Find the error in this sentence:</h3>
        </div>
        <p className="text-xl text-red-700">{currentQuestion.incorrectSentence}</p>
      </div>

      {/* Input for Correction */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
        <label className="block mb-3">Write the corrected sentence:</label>
        <textarea
          value={userCorrection}
          onChange={(e) => setUserCorrection(e.target.value)}
          disabled={showAnswer}
          className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-orange-400 focus:outline-none"
          rows={3}
          placeholder="Type your correction here..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={checkAnswer}
          disabled={!userCorrection.trim() || showAnswer}
          className="flex-1 bg-orange-600 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 transition-all"
        >
          {t.common.submit}
        </button>
        {showAnswer && (
          <button
            onClick={skipToNext}
            className="flex-1 bg-gray-600 text-white py-3 rounded-xl hover:bg-gray-700 transition-all"
          >
            {t.common.next} →
          </button>
        )}
      </div>

      {/* Answer and Explanation */}
      {showAnswer && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
          <h3 className="text-green-800 mb-3">✅ Correct Answer:</h3>
          <p className="text-xl text-green-700 mb-4">{currentQuestion.correctSentence}</p>
          
          <div className="bg-white rounded-xl p-4">
            <h4 className="mb-2">📚 Explanation:</h4>
            <p className="text-gray-700">{currentQuestion.explanation}</p>
          </div>
        </div>
      )}

      {/* Learning Tip */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-6">
        <h3 className="mb-2">💡 Detective Tip:</h3>
        <p className="text-sm text-gray-700">
          Read the sentence carefully. Look for grammar mistakes, spelling errors, or incorrect facts.
          Learning from errors is one of the best ways to improve!
        </p>
      </div>
    </div>
  );
}
