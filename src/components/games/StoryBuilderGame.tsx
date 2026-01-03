import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { storyData } from '../../utils/gameData';
import { updateSkill } from '../../utils/storage';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  onBack: () => void;
}

export function StoryBuilderGame({ onBack }: Props) {
  const [currentDay, setCurrentDay] = useState(1);
  const [score, setScore] = useState(0);
  const [shuffledSentences, setShuffledSentences] = useState<string[]>([]);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { t } = useLanguage();

  const currentStory = storyData[currentDay - 1];

  useEffect(() => {
    if (currentStory) {
      const shuffled = [...currentStory.sentences].sort(() => Math.random() - 0.5);
      setShuffledSentences(shuffled);
      setUserOrder([]);
      setShowResult(false);
    }
  }, [currentDay]);

  const handleSentenceClick = (sentence: string) => {
    if (!userOrder.includes(sentence)) {
      setUserOrder([...userOrder, sentence]);
    }
  };

  const handleRemoveSentence = (index: number) => {
    setUserOrder(userOrder.filter((_, i) => i !== index));
  };

  const checkStory = () => {
    let correctCount = 0;
    currentStory.sentences.forEach((sentence, index) => {
      if (userOrder[index] === sentence) {
        correctCount++;
      }
    });

    const percentage = (correctCount / currentStory.sentences.length) * 100;
    const earnedPoints = Math.floor(percentage / 10) * 5;
    
    setScore(score + earnedPoints);
    updateSkill('creativity', earnedPoints / 5);
    setShowResult(true);

    if (percentage === 100) {
      setTimeout(() => {
        if (currentDay < storyData.length) {
          setCurrentDay(currentDay + 1);
        }
      }, 2000);
    }
  };

  const resetStory = () => {
    const shuffled = [...currentStory.sentences].sort(() => Math.random() - 0.5);
    setShuffledSentences(shuffled);
    setUserOrder([]);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl">Story Builder Quest 📖</h1>
          <p className="text-sm text-gray-600">Day {currentDay} / {storyData.length}</p>
        </div>
        <div className="bg-purple-100 px-4 py-2 rounded-lg">
          <span className="text-sm">Score: {score}</span>
        </div>
      </div>

      {/* Story Title */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-6">
        <h2 className="text-2xl mb-2">{currentStory.title}</h2>
        <p className="opacity-90">Theme: {currentStory.theme}</p>
      </div>

      {/* User's Story Order */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-lg">
        <h3 className="mb-3">Your Story Order:</h3>
        <div className="space-y-2 min-h-[200px]">
          {userOrder.map((sentence, index) => (
            <div
              key={index}
              onClick={() => !showResult && handleRemoveSentence(index)}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                showResult
                  ? currentStory.sentences[index] === sentence
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-purple-200 bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <span className="mr-2">{index + 1}.</span>
              {sentence}
              {showResult && currentStory.sentences[index] === sentence && (
                <Check className="w-5 h-5 text-green-600 float-right" />
              )}
            </div>
          ))}
          {userOrder.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              Click sentences below to build your story
            </p>
          )}
        </div>
      </div>

      {/* Available Sentences */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-4">
        <h3 className="mb-3">Available Sentences:</h3>
        <div className="space-y-2">
          {shuffledSentences
            .filter((s) => !userOrder.includes(s))
            .map((sentence, index) => (
              <button
                key={index}
                onClick={() => handleSentenceClick(sentence)}
                disabled={showResult}
                className="w-full p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-left disabled:opacity-50"
              >
                {sentence}
              </button>
            ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={checkStory}
          disabled={userOrder.length !== currentStory.sentences.length || showResult}
          className="flex-1 bg-purple-600 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-all"
        >
          {t.common.submit}
        </button>
        {showResult && (
          <button
            onClick={resetStory}
            className="flex-1 bg-gray-600 text-white py-3 rounded-xl hover:bg-gray-700 transition-all"
          >
            {t.common.tryAgain}
          </button>
        )}
      </div>

      {/* Result */}
      {showResult && (
        <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <h3 className="mb-3">Correct Story Order:</h3>
          <div className="space-y-2">
            {currentStory.sentences.map((sentence, index) => (
              <div key={index} className="p-3 bg-white rounded-xl">
                <span className="mr-2">{index + 1}.</span>
                {sentence}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
