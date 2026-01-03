import React, { useState } from 'react';
import { validateAnswer } from '../../utils/semanticMatch';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { conceptQuestions } from '../../utils/gameData';
import { updateSkill } from '../../utils/storage';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  onBack: () => void;
}

export function ConceptLadderGame({ onBack }: Props) {
  const [subject, setSubject] = useState<'science' | 'math' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { t } = useLanguage();

  const maxSteps = 10;
  
  const questions = conceptQuestions.filter(
    (q) => q.subject === subject && q.day === currentDay
  );
  
  const currentQuestion = questions[Math.min(currentStep - 1, questions.length - 1)];

  const handleSubjectSelect = (selectedSubject: 'science' | 'math') => {
    setSubject(selectedSubject);
    setCurrentStep(1);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    // Accept multiple correct answers (array)
    const correctOption = currentQuestion.options[currentQuestion.correctAnswer];
    const acceptable = Array.isArray(correctOption) ? correctOption : [correctOption];
    const userOption = currentQuestion.options[answerIndex];
    const { isMatch, isExact, bestMatch, suggestions: simSuggestions } = validateAnswer(userOption, acceptable);
    const isCorrect = isMatch;

    if (isCorrect) {
      setScore(score + 10);
      updateSkill('logic', 2);
      setFeedbackMsg(isExact ? 'Correct! Climbing up!' : "You're very close! That's an acceptable answer.");
      setSuggestions([]);
      setTimeout(() => {
        if (currentStep < maxSteps) {
          setCurrentStep(currentStep + 1);
        } else {
          alert('Congratulations! You reached the top of the ladder!');
          setCurrentDay(currentDay + 1);
          setCurrentStep(1);
        }
        setSelectedAnswer(null);
        setShowFeedback(false);
        setFeedbackMsg('');
        setSuggestions([]);
      }, 1500);
    } else {
      if (simSuggestions.length > 0) {
        setFeedbackMsg("Almost! Try a synonym or check your spelling.");
        setSuggestions(simSuggestions);
      } else {
        setFeedbackMsg('Incorrect. Going down one step.');
        setSuggestions([]);
      }
      setTimeout(() => {
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
        }
        setSelectedAnswer(null);
        setShowFeedback(false);
        setFeedbackMsg('');
        setSuggestions([]);
      }, 1500);
    }
  };

  if (!subject) {
    return (
      <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Concept Ladder 🪜</h1>
          <div></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl mb-4">Choose Subject:</h2>
          
          <button
            onClick={() => handleSubjectSelect('science')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-8 hover:shadow-xl transition-all active:scale-95"
          >
            <div className="text-3xl mb-2">🔬</div>
            <div className="text-2xl mb-2">Science</div>
            <p className="opacity-90">Explore the world around you</p>
          </button>
          
          <button
            onClick={() => handleSubjectSelect('math')}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-8 hover:shadow-xl transition-all active:scale-95"
          >
            <div className="text-3xl mb-2">🔢</div>
            <div className="text-2xl mb-2">Mathematics</div>
            <p className="opacity-90">Build your problem-solving skills</p>
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
          onClick={() => setSubject(null)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl">
            {subject === 'science' ? '🔬 Science' : '🔢 Math'} Ladder
          </h1>
          <p className="text-sm text-gray-600">Day {currentDay}</p>
        </div>
        <div className="bg-green-100 px-4 py-2 rounded-lg">
          <span className="text-sm">Score: {score}</span>
        </div>
      </div>

      {/* Ladder Visualization */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span>Step {currentStep} / {maxSteps}</span>
          <span className="text-2xl">🎯</span>
        </div>
        
        <div className="relative h-64 bg-gradient-to-t from-gray-100 to-blue-100 rounded-xl p-4">
          {/* Ladder Steps */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            {[...Array(10)].map((_, i) => {
              const stepNum = 10 - i;
              const isCurrentStep = stepNum === currentStep;
              
              return (
                <div
                  key={i}
                  className={`h-6 rounded transition-all ${
                    stepNum < currentStep
                      ? 'bg-green-300'
                      : stepNum === currentStep
                      ? 'bg-blue-500 scale-110'
                      : 'bg-gray-300'
                  }`}
                >
                  {isCurrentStep && (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-white">👤 You are here</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl mb-4">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  showFeedback
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : index === selectedAnswer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
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
                  ? 'bg-green-100 border-2 border-green-300'
                  : 'bg-red-100 border-2 border-red-300'
              }`}
            >
              <div className="mb-2">{feedbackMsg}</div>
              {suggestions.length > 0 && (
                <div className="text-sm">Other possible answers: {suggestions.join(', ')}</div>
              )}
              <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
