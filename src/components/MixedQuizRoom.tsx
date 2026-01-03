import React, { useState } from 'react';

interface MixedQuiz {
  id: string;
  title: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

interface ScoreboardEntry {
  student: string;
  score: number;
}

interface MixedQuizRoomProps {
  quiz: MixedQuiz;
  onEnd: () => void;
}

export function MixedQuizRoom({ quiz, onEnd }: MixedQuizRoomProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<ScoreboardEntry[]>([]);
  const [answers, setAnswers] = useState<{ [student: string]: number | null }>({});
  const [showScoreboard, setShowScoreboard] = useState(false);

  // Simulate real-time updates (replace with websocket in production)
  const handleAnswer = (student: string, answerIdx: number) => {
    setAnswers((prev: { [student: string]: number | null }) => ({ ...prev, [student]: answerIdx }));
    const isCorrect = quiz.questions[currentQuestion].correctAnswer === answerIdx;
    setScores((prev: ScoreboardEntry[]) => {
      const entry = prev.find((e: ScoreboardEntry) => e.student === student);
      if (entry) {
        return prev.map((e: ScoreboardEntry) =>
          e.student === student ? { ...e, score: e.score + (isCorrect ? 10 : 0) } : e
        );
      } else {
        return [...prev, { student, score: isCorrect ? 10 : 0 }];
      }
    });
    setShowScoreboard(true);
    setTimeout(() => {
      setShowScoreboard(false);
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswers({});
      } else {
        onEnd();
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 max-w-screen-lg mx-auto">
      <h2 className="text-2xl mb-4">{quiz.title}</h2>
      <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
        <h3 className="text-xl mb-2">Question {currentQuestion + 1} of {quiz.questions.length}</h3>
        <p className="mb-4">{quiz.questions[currentQuestion].question}</p>
        <div className="space-y-2">
          {quiz.questions[currentQuestion].options.map((opt: string, idx: number) => (
            <button
              key={idx}
              className="w-full p-3 rounded-lg border-2 border-gray-200 hover:bg-blue-50"
              onClick={() => handleAnswer('Student', idx)}
              disabled={answers['Student'] !== undefined}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      {showScoreboard && (
        <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4 mb-4">
          <h4 className="text-lg mb-2">Live Scoreboard</h4>
          <ul>
            {scores.sort((a: ScoreboardEntry, b: ScoreboardEntry) => b.score - a.score).map((entry: ScoreboardEntry, idx: number) => (
              <li key={entry.student} className="mb-1">
                <span className="font-bold">{idx + 1}. {entry.student}</span>: {entry.score} pts
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
