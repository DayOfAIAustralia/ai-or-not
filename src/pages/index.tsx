import { useState } from "react";
import { Button } from "@heroui/button";

import itemsData from "@/items.json";
import Navbar from "@/components/Navbar";

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
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelIntro, setShowLevelIntro] = useState(false);
  const [items, setItems] = useState<Item[]>(() =>
    shuffleArray(itemsData.items)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const currentItem = items[currentIndex];
  const isGameOver = currentIndex >= items.length;

  const getLevelItems = (level: number): Item[] => {
    return level === 1 ? itemsData.items : (itemsData as { items: Item[]; level2: Item[] }).level2;
  };

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
    setItems(shuffleArray(getLevelItems(currentLevel)));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const handleNextLevel = () => {
    setCurrentLevel(2);
    setShowLevelIntro(true);
  };

  const handleStartLevel2 = () => {
    setItems(shuffleArray(getLevelItems(2)));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setShowLevelIntro(false);
  };

  const handleBackToStart = () => {
    setGameStarted(false);
    setCurrentLevel(1);
    setShowLevelIntro(false);
    setItems(shuffleArray(itemsData.items));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
  };

  // Landing Page
  if (!gameStarted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 text-center bg-yellow">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-4 border-gray-900 p-10 md:p-16 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              <span className="text-blue">AI or Not AI?</span>
            </h1>

            <div className="space-y-4 my-8 text-xl">
              <p>
                Some things use <span className="font-bold text-blue">AI</span>{" "}
                (Artificial Intelligence) and some don't.
              </p>
              <p className="text-2xl font-semibold text-pink">
                Can you tell which is which?
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-lg border-2 border-gray-900">
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
              className="text-2xl px-14 py-8 font-bold border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              onPress={handleStartGame}
            >
              Play!
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Level 2 Intro Screen
  if (showLevelIntro && currentLevel === 2) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 text-center bg-yellow">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-4 border-gray-900 p-10 md:p-16 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              <span className="text-blue">Level 2</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink">
              AI-Powered?
            </h2>

            <div className="space-y-4 my-8 text-xl">
              <p>
                Great job on Level 1! Now let's see if you can tell which things are{" "}
                <span className="font-bold text-green">AI-Powered</span> and which are not!
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-lg border-2 border-gray-900">
                <p className="text-gray-600 dark:text-gray-400">
                  Tap <span className="font-bold text-green">"AI-Powered"</span> if you
                  think the item uses AI, or{" "}
                  <span className="font-bold text-pink">"Not AI-Powered"</span> if it
                  doesn't.
                </p>
              </div>
            </div>

            <Button
              color="primary"
              size="lg"
              className="text-2xl px-14 py-8 font-bold border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              onPress={handleStartLevel2}
            >
              Start Level 2!
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Game Over Screen
  if (isGameOver) {
    const percentage = Math.round((score / items.length) * 100);
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 text-center bg-yellow">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-4 border-gray-900 p-10 md:p-16 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-blue">
              {currentLevel === 1 ? "Level 1 Complete!" : "Level 2 Complete!"}
            </h1>

            <div className="bg-white rounded-2xl p-8 mb-8 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
              <p className="text-2xl mb-2">You got</p>
              <p className="text-6xl font-bold text-green mb-2">
                {score} / {items.length}
              </p>
              <p className="text-3xl font-semibold text-yellow">
                {percentage}% correct!
              </p>
            </div>

            <p className="text-2xl mb-6">
              {percentage === 100
                ? "🎉 Perfect score! Amazing!"
                : percentage >= 75
                  ? "🌟 Great job!"
                  : percentage >= 50
                    ? "👍 Good effort!"
                    : "Keep learning about AI!"}
            </p>

            <div className="flex flex-col gap-4">
              <Button
                color="primary"
                size="lg"
                className="text-2xl px-12 py-8 font-bold border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                onPress={handlePlayAgain}
              >
                Play Again
              </Button>

              {currentLevel === 1 ? (
                <Button
                  color="secondary"
                  size="lg"
                  className="text-2xl px-12 py-8 font-bold border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  onPress={handleNextLevel}
                >
                  Next Level →
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="text-2xl px-12 py-8 font-bold border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-pink text-white"
                  onPress={handleBackToStart}
                >
                  Back to Start
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Game Screen
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 text-center bg-yellow">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-4 border-gray-900 p-8 md:p-12 max-w-2xl w-full">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-base font-medium text-gray-500">
              Question {currentIndex + 1} of {items.length}
            </span>
            <span className="bg-yellow text-gray-900 font-bold px-4 py-2 rounded-full text-base">
              Score: {score}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-8 border-2 border-gray-900">
            <div
              className="bg-blue h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / items.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
            <h1 className="text-2xl md:text-3xl font-bold">
              {currentItem.name}
            </h1>
          </div>

          {!showResult ? (
            /* Answer Buttons */
            <div className="flex gap-6 justify-center">
              <Button
                color="secondary"
                size="lg"
                className={`text-xl px-8 py-8 font-bold flex-1 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${currentLevel === 1 ? "max-w-[180px]" : "max-w-[220px]"}`}
                onPress={() => handleAnswer(true)}
              >
                {currentLevel === 1 ? "AI" : "AI-Powered"}
              </Button>
              <Button
                size="lg"
                className={`text-xl px-8 py-8 font-bold flex-1 bg-pink text-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${currentLevel === 1 ? "max-w-[180px]" : "max-w-[220px]"}`}
                onPress={() => handleAnswer(false)}
              >
                {currentLevel === 1 ? "Not AI" : "Not AI-Powered"}
              </Button>
            </div>
          ) : (
            /* Result Feedback */
            <div className="space-y-6">
              <div
                className={`rounded-2xl p-8 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] ${
                  lastAnswerCorrect
                    ? "bg-green/20"
                    : "bg-orange/20"
                }`}
              >
                <p
                  className={`text-4xl font-bold mb-3 ${
                    lastAnswerCorrect ? "text-green" : "text-orange"
                  }`}
                >
                  {lastAnswerCorrect ? "Correct! ✓" : "Not quite ✗"}
                </p>
                <p className="text-xl mb-4">
                  {currentItem.name} is{" "}
                  <span
                    className={`font-bold ${currentItem.isAI ? "text-green" : "text-pink"}`}
                  >
                    {currentLevel === 1
                      ? (currentItem.isAI ? "AI" : "Not AI")
                      : (currentItem.isAI ? "AI-Powered" : "Not AI-Powered")}
                  </span>
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 text-left">
                  {currentItem.explanation}
                </p>
              </div>

              <Button
                color="primary"
                size="lg"
                className="text-2xl px-12 py-8 font-bold border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                onPress={handleNext}
              >
                Next →
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
