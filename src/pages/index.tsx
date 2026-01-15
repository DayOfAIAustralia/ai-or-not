import { useState, useCallback } from "react";

import itemsData from "@/items.json";
import { Item, YearLevel } from "@/types/game";
import { shuffleArray } from "@/utils/shuffle";
import { useGameTimer } from "@/hooks/useGameTimer";
import { LandingScreen } from "@/components/screens/LandingScreen";
import { LevelIntroScreen } from "@/components/screens/LevelIntroScreen";
import { GameOverScreen } from "@/components/screens/GameOverScreen";
import { GameScreen } from "@/components/screens/GameScreen";

type GameState = "landing" | "levelIntro" | "playing" | "gameOver";

export default function IndexPage() {
  const [yearLevel, setYearLevel] = useState<YearLevel>(null);
  const [gameState, setGameState] = useState<GameState>("landing");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const currentItem = items[currentIndex];
  const timerDuration = yearLevel === "primary" ? 15 : 10;

  const handleTimeUp = useCallback(() => {
    setLastAnswerCorrect(false);
    setShowResult(true);
  }, []);

  const { timeLeft } = useGameTimer({
    duration: timerDuration,
    onTimeUp: handleTimeUp,
    isActive: gameState === "playing" && !showResult && currentIndex < items.length,
  });

  const getLevelItems = (level: number): Item[] => {
    const questionSet =
      yearLevel === "primary" ? itemsData.primary : itemsData.secondary;
    return level === 1 ? questionSet.level1 : questionSet.level2;
  };

  const handleStartGame = () => {
    const questions = getLevelItems(1);
    setItems(shuffleArray(questions));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setGameState("playing");
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
    const nextIndex = currentIndex + 1;
    if (nextIndex >= items.length) {
      setGameState("gameOver");
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePlayAgain = () => {
    setItems(shuffleArray(getLevelItems(currentLevel)));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setGameState("playing");
  };

  const handleNextLevel = () => {
    setCurrentLevel(2);
    setGameState("levelIntro");
  };

  const handleStartLevel2 = () => {
    setItems(shuffleArray(getLevelItems(2)));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setGameState("playing");
  };

  const handleBackToStart = () => {
    setGameState("landing");
    setCurrentLevel(1);
    setYearLevel(null);
    setItems([]);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
  };

  switch (gameState) {
    case "landing":
      return (
        <LandingScreen
          yearLevel={yearLevel}
          onYearLevelChange={setYearLevel}
          onStartGame={handleStartGame}
        />
      );

    case "levelIntro":
      return <LevelIntroScreen onStartLevel={handleStartLevel2} />;

    case "gameOver":
      return (
        <GameOverScreen
          score={score}
          total={items.length}
          currentLevel={currentLevel}
          onPlayAgain={handlePlayAgain}
          onNextLevel={handleNextLevel}
          onBackToStart={handleBackToStart}
        />
      );

    case "playing":
      return (
        <GameScreen
          currentIndex={currentIndex}
          totalItems={items.length}
          score={score}
          currentItem={currentItem}
          currentLevel={currentLevel}
          showResult={showResult}
          lastAnswerCorrect={lastAnswerCorrect}
          timeLeft={timeLeft}
          timerDuration={timerDuration}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      );
  }
}
