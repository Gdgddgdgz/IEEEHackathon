import React, { useState, useEffect } from 'react';
import { validateAnswer } from '../../utils/semanticMatch';
import { ArrowLeft, Check, X, Shuffle } from 'lucide-react';
import { parallelSentences } from '../../utils/gameData';
import { updateGameProgress, updateSkill, getUserProgress } from '../../utils/storage';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  onBack: () => void;
}

type GameMode = 'match' | 'rearrange' | 'menu';

export function ParallelSentenceGame({ onBack }: Props) {
  const [mode, setMode] = useState<GameMode>('menu');
  const [currentDay, setCurrentDay] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [userSentence, setUserSentence] = useState<string[]>([]);
  const { t } = useLanguage();

  const progress = getUserProgress();
  const currentQuestion = parallelSentences[currentDay - 1];

  useEffect(() => {
    if (mode === 'rearrange' && currentQuestion?.words) {
      const shuffled = [...currentQuestion.words].sort(() => Math.random() - 0.5);
      setShuffledWords(shuffled);
      setUserSentence([]);
    }
  }, [mode, currentDay]);

  const handleMatchSelect = (sentence: string) => {
    setSelectedSentence(sentence);
    // Accept multiple correct answers if needed
    const acceptable = Array.isArray(currentQuestion.parallel)
      ? currentQuestion.parallel
      : [currentQuestion.parallel];
    const { isMatch, isExact, bestMatch, suggestions: simSuggestions } = validateAnswer(sentence, acceptable);
    setFeedback(isMatch ? 'correct' : 'incorrect');
    if (isMatch) {
      setScore(score + 10);
      updateSkill('vocabulary', 2);
      setFeedbackMsg(isExact ? t.common.correct : "You're very close! That's an acceptable answer.");
      setSuggestions([]);
      setTimeout(() => {
        if (currentDay < parallelSentences.length) {
          setCurrentDay(currentDay + 1);
          setSelectedSentence(null);
          setFeedback(null);
          setFeedbackMsg('');
        }
      }, 1500);
    } else {
      if (simSuggestions.length > 0) {
        setFeedbackMsg("Almost! Try a synonym or check your spelling.");
        setSuggestions(simSuggestions);
      } else {
        setFeedbackMsg("Not quite. Give it another shot!");
        setSuggestions([]);
      }
    }
  };

  const handleWordClick = (word: string, index: number) => {
    setUserSentence([...userSentence, word]);
    setShuffledWords(shuffledWords.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (index: number) => {
    const word = userSentence[index];
    setShuffledWords([...shuffledWords, word]);
    setUserSentence(userSentence.filter((_, i) => i !== index));
  };

  const checkRearrangedSentence = () => {
    const userText = userSentence.join(' ');
    const correctText = currentQuestion.words?.join(' ') || '';
    const acceptable = [correctText];
    const { isMatch, isExact, bestMatch, suggestions: simSuggestions } = validateAnswer(userText, acceptable);
    setFeedback(isMatch ? 'correct' : 'incorrect');
    if (isMatch) {
      setScore(score + 15);
      updateSkill('vocabulary', 3);
      setFeedbackMsg(isExact ? t.common.correct : "You're very close! That's an acceptable answer.");
      setSuggestions([]);
      setTimeout(() => {
        if (currentDay < parallelSentences.length) {
          setCurrentDay(currentDay + 1);
          setFeedback(null);
          setFeedbackMsg('');
        }
      }, 1500);
    } else {
      if (simSuggestions.length > 0) {
        setFeedbackMsg("Almost! Try a synonym or check your spelling.");
        setSuggestions(simSuggestions);
      } else {
        setFeedbackMsg("Not quite. Give it another shot!");
        setSuggestions([]);
      }
    }
  };

  const renderModeMenu = () => (
    <div className="space-y-4">
      <h2 className="text-2xl mb-4">Choose Game Mode</h2>
      
      <button
        onClick={() => setMode('match')}
        className="w-full bg-blue-500 text-white rounded-2xl p-6 hover:bg-blue-600 transition-all active:scale-95"
      >
        <div className="text-xl mb-2">🎯 Match Parallel Sentences</div>
        <p className="text-sm opacity-90">Find the sentence with similar meaning</p>
      </button>
      
      <button
        onClick={() => setMode('rearrange')}
        className="w-full bg-purple-500 text-white rounded-2xl p-6 hover:bg-purple-600 transition-all active:scale-95"
      >
        <div className="text-xl mb-2">🔄 Rearrange Words</div>
        <p className="text-sm opacity-90">Build the parallel sentence from words</p>
      </button>
    </div>
  );

  const renderMatchMode = () => {
    const options = [
      currentQuestion.parallel,
      currentQuestion.english + ' not',
      currentQuestion.english.split(' ').reverse().join(' '),
      'This is a different sentence altogether.',
    ].sort(() => Math.random() - 0.5);

    return (
      <div>
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <p className="text-sm text-gray-600 mb-2">Original Sentence:</p>
          <p className="text-xl">{currentQuestion.english}</p>
        </div>

        <p className="mb-4">Select the sentence with similar meaning:</p>

        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleMatchSelect(option)}
              disabled={feedback !== null}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedSentence === option
                  ? feedback === 'correct'
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {option}
              {selectedSentence === option && feedback === 'correct' && (
                <Check className="w-5 h-5 text-green-600 float-right" />
              )}
              {selectedSentence === option && feedback === 'incorrect' && (
                <X className="w-5 h-5 text-red-600 float-right" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderRearrangeMode = () => (
    <div>
      <div className="bg-purple-50 rounded-2xl p-6 mb-6">
        <p className="text-sm text-gray-600 mb-2">Create a parallel sentence for:</p>
        <p className="text-xl">{currentQuestion.english}</p>
      </div>

      {/* User's sentence */}
      <div className="bg-white rounded-xl p-4 mb-4 min-h-[80px] border-2 border-dashed border-gray-300">
        <p className="text-sm text-gray-500 mb-2">Your sentence:</p>
        <div className="flex flex-wrap gap-2">
          {userSentence.map((word, index) => (
            <button
              key={index}
              onClick={() => handleRemoveWord(index)}
              className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-all"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Available words */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Available words:</p>
        <div className="flex flex-wrap gap-2">
          {shuffledWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordClick(word, index)}
              className="bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition-all"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={checkRearrangedSentence}
        disabled={userSentence.length === 0 || feedback !== null}
        className="w-full bg-purple-600 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-all"
      >
        {t.common.submit}
      </button>

      {feedback && (
        <div
          className={`mt-4 p-4 rounded-xl ${
            feedback === 'correct' || feedbackMsg.includes('close')
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
  );

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={mode === 'menu' ? onBack : () => setMode('menu')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl">Parallel Sentence Game</h1>
          <p className="text-sm text-gray-600">Day {currentDay} / {parallelSentences.length}</p>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <span className="text-sm">Score: {score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${(currentDay / parallelSentences.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Game Content */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {mode === 'menu' && renderModeMenu()}
        {mode === 'match' && renderMatchMode()}
        {mode === 'rearrange' && renderRearrangeMode()}
      </div>
    </div>
  );
}
