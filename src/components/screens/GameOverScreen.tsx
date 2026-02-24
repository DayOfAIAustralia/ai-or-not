import { useEffect } from "react";
import { GameButton } from "@/components/GameButton";
import Navbar from "@/components/Navbar";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface GameOverScreenProps {
  score: number;
  total: number;
  currentLevel: number;
  onNextLevel: () => void;
  onSeeSummary: () => void;
}

export function GameOverScreen({
  score,
  total,
  currentLevel,
  onNextLevel,
  onSeeSummary,
}: GameOverScreenProps) {
  const { play } = useSoundEffects();
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    play("levelComplete");
  }, [percentage, play]);

  const getMessage = () => {
    if (percentage === 100) return "Perfect score! Amazing!";
    if (percentage >= 75) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep learning about AI!";
  };

  const getEmoji = () => {
    if (percentage === 100) return "🎉";
    if (percentage >= 75) return "🌟";
    if (percentage >= 50) return "👍";
    return "";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 pt-16 md:pt-20 text-center bg-yellow">
        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-3 md:border-4 border-gray-900 p-4 md:p-6 lg:p-8 max-w-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-blue">
            Level {currentLevel} Complete!
          </h1>

          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 mb-3 md:mb-4 border-3 md:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
            <p className="text-lg md:text-xl mb-1 md:mb-2">You got</p>
            <p className="text-3xl md:text-4xl font-bold text-green mb-1 md:mb-2">
              {score} / {total}
            </p>
            <p className="text-lg md:text-xl font-semibold text-yellow">
              {percentage}% correct!
            </p>
          </div>

          <p className="text-lg md:text-xl mb-3 md:mb-4">
            {getEmoji()} {getMessage()}
          </p>

          <div className="flex flex-col gap-3 md:gap-4">
            {currentLevel < 3 ? (
              <GameButton
                variant="secondary"
                onPress={onNextLevel}
                className="text-lg md:text-xl px-8 md:px-10 py-3 md:py-4"
              >
                Next Level →
              </GameButton>
            ) : (
              <GameButton
                variant="pink"
                onPress={onSeeSummary}
                className="text-lg md:text-xl px-8 md:px-10 py-3 md:py-4"
              >
                See Summary
              </GameButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
