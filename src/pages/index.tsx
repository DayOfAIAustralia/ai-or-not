import { useState, useCallback } from "react";

import primaryLevel1 from "@/questions/primary/level1.json";
import primaryLevel2 from "@/questions/primary/level2.json";
import primaryLevel3 from "@/questions/primary/level3.json";
import secondaryLevel1 from "@/questions/secondary/level1.json";
import secondaryLevel2 from "@/questions/secondary/level2.json";
import secondaryLevel3 from "@/questions/secondary/level3.json";
import { Item, YearLevel, LevelScore } from "@/types/game";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { LandingScreen } from "@/components/screens/LandingScreen";
import { LevelIntroScreen } from "@/components/screens/LevelIntroScreen";
import { GameOverScreen } from "@/components/screens/GameOverScreen";
import { GameScreen } from "@/components/screens/GameScreen";
import { FinalFeedbackScreen } from "@/components/screens/FinalFeedbackScreen";

type GameState = "landing" | "levelIntro" | "playing" | "gameOver" | "finalFeedback";

export default function IndexPage() {
  const [yearLevel, setYearLevel] = useState<YearLevel>(null);
  const [gameState, setGameState] = useState<GameState>("landing");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [levelScores, setLevelScores] = useState<LevelScore[]>([]);

  const { play, stop } = useSoundEffects();

  const currentItem = items[currentIndex];
  const timerDuration = yearLevel === "primary" ? 30 : 20;

  const handleTimeUp = useCallback(() => {
    stop("tick");
    play("wrong");
    setLastAnswerCorrect(false);
    setShowResult(true);
  }, [play, stop]);

  const handleTick = useCallback(
    (timeLeft: number) => {
      if (timeLeft === 9) {
        play("tick");
      }
    },
    [play],
  );

  const { timeLeft } = useGameTimer({
    duration: timerDuration,
    onTimeUp: handleTimeUp,
    onTick: handleTick,
    isActive:
      gameState === "playing" && !showResult && currentIndex < items.length,
  });

  const getLevelItems = (level: number): Item[] => {
    const questions =
      yearLevel === "primary"
        ? [primaryLevel1, primaryLevel2, primaryLevel3]
        : [secondaryLevel1, secondaryLevel2, secondaryLevel3];
    return questions[level - 1] as Item[];
  };

  const handleStartGame = () => {
    play("levelStart");
    const questions = getLevelItems(1);
    setItems(questions);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setLevelScores([]);
    setGameState("playing");
  };

  const handleAnswer = (answeredAI: boolean) => {
    stop("tick");
    const correct = answeredAI === currentItem.isAI;
    setLastAnswerCorrect(correct);
    if (correct) {
      play("correct");
      setScore((s) => s + 1);
    } else {
      play("wrong");
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= items.length) {
      setLevelScores((prev) => [
        ...prev.filter((ls) => ls.level !== currentLevel),
        { level: currentLevel, score, total: items.length },
      ]);
      setGameState("gameOver");
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    setCurrentLevel(nextLevel);
    setGameState("levelIntro");
  };

  const handleStartNextLevel = () => {
    play("levelStart");
    setItems(getLevelItems(currentLevel));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setGameState("playing");
  };

  const handleSeeSummary = () => {
    setGameState("finalFeedback");
  };

  const handleBackToStart = () => {
    setGameState("landing");
    setCurrentLevel(1);
    setYearLevel(null);
    setItems([]);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setLevelScores([]);
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
      return (
        <LevelIntroScreen
          level={currentLevel}
          onStartLevel={handleStartNextLevel}
        />
      );

    case "gameOver":
      return (
        <GameOverScreen
          score={score}
          total={items.length}
          currentLevel={currentLevel}
          onNextLevel={handleNextLevel}
          onSeeSummary={handleSeeSummary}
        />
      );

    case "finalFeedback":
      return (
        <FinalFeedbackScreen
          levelScores={levelScores}
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
