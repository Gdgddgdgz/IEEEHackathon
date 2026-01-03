import React, { useState, useEffect } from 'react';
import { validateAnswer } from '../../utils/semanticMatch';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { visualWordData } from '../../utils/gameData';
import { updateSkill } from '../../utils/storage';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  onBack: () => void;
}

export function VisualWordGame({ onBack }: Props) {
  const [currentDay, setCurrentDay] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { t } = useLanguage();

  const currentQuestion = visualWordData[currentDay - 1];

  useEffect(() => {
    // Simulate image loading with placeholder
    setImageUrl(`https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400&q=80`);
  }, [currentDay]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);

    // Accept multiple correct answers (array)
    const acceptable = Array.isArray(currentQuestion.correctWord)
      ? currentQuestion.correctWord
      : [currentQuestion.correctWord];
    const { isMatch, isExact, bestMatch, suggestions: simSuggestions } = validateAnswer(option, acceptable);

    if (isMatch) {
      setScore(score + 10);
      updateSkill('vocabulary', 2);
      setFeedbackMsg(isExact ? t.common.correct : "You're very close! That's an acceptable answer.");
      setSuggestions([]);
      setTimeout(() => {
        if (currentDay < visualWordData.length) {
          setCurrentDay(currentDay + 1);
          setSelectedOption(null);
          setShowFeedback(false);
        }
      }, 1500);
    } else {
      // Show nuanced feedback
      if (simSuggestions.length > 0) {
        setFeedbackMsg("Almost! Try a synonym or check your spelling.");
        setSuggestions(simSuggestions);
      } else {
        setFeedbackMsg("Not quite. Give it another shot!");
        setSuggestions([]);
      }
    }
  };

  const tryAgain = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedbackMsg('');
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl">Visual to Word</h1>
          <p className="text-sm text-gray-600">Day {currentDay} / {visualWordData.length}</p>
        </div>
        <div className="bg-yellow-100 px-4 py-2 rounded-lg">
          <span className="text-sm">Score: {score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 transition-all"
            style={{ width: `${(currentDay / visualWordData.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Image Display */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
          <div className="text-center p-8">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Image: {currentQuestion.imageQuery}</p>
            <p className="text-xs text-gray-400 mt-2">(Offline mode - image placeholder)</p>
          </div>
        </div>
        
        <p className="text-center text-gray-600">What do you see in this image?</p>
      </div>

      {/* Options */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="mb-4">Select the correct word:</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleOptionSelect(option)}
              disabled={showFeedback}
              className={`p-4 rounded-xl border-2 transition-all ${
                showFeedback
                  ? option === currentQuestion.correctWord
                    ? 'border-green-500 bg-green-50'
                    : option === selectedOption
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white'
                  : 'border-gray-200 bg-white hover:border-yellow-300 hover:bg-yellow-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`mt-4 p-4 rounded-xl ${
              feedbackMsg.includes('correct') || feedbackMsg.includes('close')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <div>
              <p className="mb-2">{feedbackMsg}</p>
              {suggestions.length > 0 && (
                <p className="text-sm">Other possible answers: {suggestions.join(', ')}</p>
              )}
              {!feedbackMsg.includes('correct') && (
                <button
                  onClick={tryAgain}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                >
                  {t.common.tryAgain}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hint Section */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-6">
        <h3 className="mb-2">Tip:</h3>
        <p className="text-sm text-gray-700">
          Look carefully at all details in the image. Think about what the main subject is.
        </p>
      </div>
    </div>
  );
}
