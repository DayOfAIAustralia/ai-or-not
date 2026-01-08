import { useState } from "react";
import { Button } from "@heroui/button";

import itemsData from "@/items.json";

interface Item {
  name: string;
  isAI: boolean;
  explanation: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function IndexPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [items, setItems] = useState<Item[]>(() =>
    shuffleArray(itemsData.items)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const currentItem = items[currentIndex];
  const isGameOver = currentIndex >= items.length;

  const handleStartGame = () => {
    setItems(shuffleArray(itemsData.items));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setGameStarted(true);
  };

  const handleAnswer = (answeredAI: boolean) => {
    const correct = answeredAI === currentItem.isAI;
    setLastAnswerCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setCurrentIndex((i) => i + 1);
  };

  const handlePlayAgain = () => {
    setItems(shuffleArray(itemsData.items));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
  };

  // Landing Page
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-blue/10 to-pink/10">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8 md:p-12 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-blue">AI or Not AI?</span>
          </h1>

          <div className="space-y-4 my-8 text-lg">
            <p>
              Some things use <span className="font-bold text-blue">AI</span>{" "}
              (Artificial Intelligence) and some don't.
            </p>
            <p className="text-xl font-semibold text-pink">
              Can you tell which is which?
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-base border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                Tap <span className="font-bold text-green">"AI"</span> if you
                think it uses AI, or{" "}
                <span className="font-bold text-pink">"Not AI"</span> if it
                doesn't.
              </p>
            </div>
          </div>

          <Button
            color="primary"
            size="lg"
            className="text-xl px-12 py-7 font-bold"
            onPress={handleStartGame}
          >
            Play!
          </Button>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (isGameOver) {
    const percentage = Math.round((score / items.length) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-green/10 to-yellow/10">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8 md:p-12 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue">
            Game Over!
          </h1>

          <div className="bg-yellow/20 rounded-2xl p-6 mb-8 border-2 border-yellow/30">
            <p className="text-xl mb-2">You got</p>
            <p className="text-5xl font-bold text-green mb-2">
              {score} / {items.length}
            </p>
            <p className="text-2xl font-semibold text-yellow">
              {percentage}% correct!
            </p>
          </div>

          <p className="text-xl mb-6">
            {percentage === 100
              ? "🎉 Perfect score! Amazing!"
              : percentage >= 75
                ? "🌟 Great job!"
                : percentage >= 50
                  ? "👍 Good effort!"
                  : "Keep learning about AI!"}
          </p>

          <Button
            color="primary"
            size="lg"
            className="text-xl px-10 py-6 font-bold"
            onPress={handlePlayAgain}
          >
            Play Again
          </Button>
        </div>
      </div>
    );
  }

  // Game Screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-blue/5 to-pink/5">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6 md:p-10 max-w-lg w-full">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-gray-500">
            Question {currentIndex + 1} of {items.length}
          </span>
          <span className="bg-yellow/20 text-yellow font-bold px-3 py-1 rounded-full text-sm">
            Score: {score}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
          <div
            className="bg-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentIndex / items.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl md:text-2xl font-bold">{currentItem.name}</h1>
        </div>

        {!showResult ? (
          /* Answer Buttons */
          <div className="flex gap-4 justify-center">
            <Button
              color="secondary"
              size="lg"
              className="text-xl px-8 py-7 font-bold flex-1 max-w-[150px]"
              onPress={() => handleAnswer(true)}
            >
              AI
            </Button>
            <Button
              size="lg"
              className="text-xl px-8 py-7 font-bold flex-1 max-w-[150px] bg-pink text-white"
              onPress={() => handleAnswer(false)}
            >
              Not AI
            </Button>
          </div>
        ) : (
          /* Result Feedback */
          <div className="space-y-4">
            <div
              className={`rounded-2xl p-6 border-2 ${
                lastAnswerCorrect
                  ? "bg-green/20 border-green/30"
                  : "bg-orange/20 border-orange/30"
              }`}
            >
              <p
                className={`text-3xl font-bold mb-2 ${
                  lastAnswerCorrect ? "text-green" : "text-orange"
                }`}
              >
                {lastAnswerCorrect ? "Correct! ✓" : "Not quite ✗"}
              </p>
              <p className="text-lg mb-3">
                {currentItem.name} is{" "}
                <span
                  className={`font-bold ${currentItem.isAI ? "text-green" : "text-pink"}`}
                >
                  {currentItem.isAI ? "AI" : "Not AI"}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                {currentItem.explanation}
              </p>
            </div>

            <Button
              color="primary"
              size="lg"
              className="text-xl px-10 py-6 font-bold"
              onPress={handleNext}
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
