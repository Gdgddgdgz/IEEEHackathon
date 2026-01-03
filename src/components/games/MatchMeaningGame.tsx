import React, { useState, useEffect } from 'react';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { matchMeaningData } from '../../utils/gameData';
import { updateSkill } from '../../utils/storage';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  onBack: () => void;
}

export function MatchMeaningGame({ onBack }: Props) {
  const [currentDay, setCurrentDay] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matches, setMatches] = useState<Array<{ word: string; meaning: string }>>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<string[]>([]);
  const { t } = useLanguage();

  const currentQuestion = matchMeaningData[currentDay - 1];

  useEffect(() => {
    // Shuffle meanings
    const allMeanings = [currentQuestion.meaning, ...currentQuestion.distractors];
    setShuffledMeanings(allMeanings.sort(() => Math.random() - 0.5));
    setMatches([]);
    setSelectedWord(null);
    setSelectedMeaning(null);
  }, [currentDay]);

  const handleWordClick = () => {
    setSelectedWord(currentQuestion.word);
  };

  const handleMeaningClick = (meaning: string) => {
    if (selectedWord) {
      setSelectedMeaning(meaning);
      
      // Check if match is correct
      if (meaning === currentQuestion.meaning) {
        setMatches([...matches, { word: selectedWord, meaning }]);
        setScore(score + 10);
        updateSkill('vocabulary', 2);
        
        setTimeout(() => {
          if (currentDay < matchMeaningData.length) {
            setCurrentDay(currentDay + 1);
          }
        }, 1500);
      } else {
        // Wrong match - reset after showing feedback
        setTimeout(() => {
          setSelectedWord(null);
          setSelectedMeaning(null);
        }, 1000);
      }
    }
  };

  const isMatched = matches.some((m) => m.word === currentQuestion.word);

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl">Match the Meaning 🧩</h1>
          <p className="text-sm text-gray-600">Day {currentDay} / {matchMeaningData.length}</p>
        </div>
        <div className="bg-pink-100 px-4 py-2 rounded-lg">
          <span className="text-sm">Score: {score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500 transition-all"
            style={{ width: `${(currentDay / matchMeaningData.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-pink-50 rounded-2xl p-4 mb-6">
        <p className="text-center">
          <LinkIcon className="w-5 h-5 inline mr-2" />
          Click the word, then click its correct meaning
        </p>
      </div>

      {/* Matching Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Word Column */}
        <div>
          <h3 className="mb-4 text-center">Word</h3>
          <button
            onClick={handleWordClick}
            disabled={isMatched}
            className={`w-full p-6 rounded-2xl border-2 transition-all ${
              isMatched
                ? 'border-green-500 bg-green-50 cursor-not-allowed'
                : selectedWord === currentQuestion.word
                ? 'border-pink-500 bg-pink-100 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-lg'
            }`}
          >
            <p className="text-2xl mb-2">{currentQuestion.word}</p>
            {isMatched && <p className="text-sm text-green-600">✓ Matched!</p>}
          </button>
        </div>

        {/* Meanings Column */}
        <div>
          <h3 className="mb-4 text-center">Meaning</h3>
          <div className="space-y-3">
            {shuffledMeanings.map((meaning, index) => {
              const isCorrect = meaning === currentQuestion.meaning;
              const isSelected = selectedMeaning === meaning;
              const isMatchedMeaning = matches.some((m) => m.meaning === meaning);

              return (
                <button
                  key={index}
                  onClick={() => handleMeaningClick(meaning)}
                  disabled={!selectedWord || isMatchedMeaning}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    isMatchedMeaning
                      ? 'border-green-500 bg-green-50 cursor-not-allowed opacity-50'
                      : isSelected
                      ? isCorrect
                        ? 'border-green-500 bg-green-100'
                        : 'border-red-500 bg-red-100'
                      : 'border-gray-200 bg-white hover:border-pink-300'
                  }`}
                >
                  {meaning}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {selectedWord && selectedMeaning && (
        <div
          className={`mt-6 p-4 rounded-xl ${
            selectedMeaning === currentQuestion.meaning
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {selectedMeaning === currentQuestion.meaning ? (
            <p>✅ Perfect match! Moving to next word...</p>
          ) : (
            <p>❌ Not quite. Try again!</p>
          )}
        </div>
      )}

      {/* Learning Tip */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-6">
        <h3 className="mb-2">💡 Vocabulary Tip:</h3>
        <p className="text-sm text-gray-700">
          Building vocabulary is key to language mastery. Try to use these new words in your daily conversations!
        </p>
      </div>
    </div>
  );
}
