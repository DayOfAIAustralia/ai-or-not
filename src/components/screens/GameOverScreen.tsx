import { GameButton } from "@/components/GameButton";
import Navbar from "@/components/Navbar";

interface GameOverScreenProps {
  score: number;
  total: number;
  currentLevel: number;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  onBackToStart: () => void;
}

export function GameOverScreen({
  score,
  total,
  currentLevel,
  onPlayAgain,
  onNextLevel,
  onBackToStart,
}: GameOverScreenProps) {
  const percentage = Math.round((score / total) * 100);

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
      <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 pt-20 mt-8 md:pt-28 text-center bg-yellow">
        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-3 md:border-4 border-gray-900 p-5 md:p-10 lg:p-16 max-w-2xl">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-blue">
            Level {currentLevel} Complete!
          </h1>

          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 mb-4 md:mb-8 border-3 md:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
            <p className="text-lg md:text-2xl mb-1 md:mb-2">You got</p>
            <p className="text-4xl md:text-6xl font-bold text-green mb-1 md:mb-2">
              {score} / {total}
            </p>
            <p className="text-xl md:text-3xl font-semibold text-yellow">
              {percentage}% correct!
            </p>
          </div>

          <p className="text-lg md:text-2xl mb-4 md:mb-6">
            {getEmoji()} {getMessage()}
          </p>

          <div className="flex flex-col gap-3 md:gap-4">
            <GameButton
              variant="primary"
              onPress={onPlayAgain}
              className="text-lg md:text-2xl px-8 md:px-12 py-4 md:py-8"
            >
              Play Again
            </GameButton>

            {currentLevel < 3 ? (
              <GameButton
                variant="secondary"
                onPress={onNextLevel}
                className="text-lg md:text-2xl px-8 md:px-12 py-4 md:py-8"
              >
                Next Level →
              </GameButton>
            ) : (
              <GameButton
                variant="pink"
                onPress={onBackToStart}
                className="text-lg md:text-2xl px-8 md:px-12 py-4 md:py-8"
              >
                Back to Start
              </GameButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
