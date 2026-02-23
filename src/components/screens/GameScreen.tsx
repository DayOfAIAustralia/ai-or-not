import Navbar from "@/components/Navbar";
import { ProgressBar } from "@/components/game/ProgressBar";
import { TimerBar } from "@/components/game/TimerBar";
import { QuestionCard } from "@/components/game/QuestionCard";
import { AnswerButtons } from "@/components/game/AnswerButtons";
import { ResultFeedback } from "@/components/game/ResultFeedback";
import { Item } from "@/types/game";

interface GameScreenProps {
  currentIndex: number;
  totalItems: number;
  score: number;
  currentItem: Item;
  currentLevel: number;
  showResult: boolean;
  lastAnswerCorrect: boolean;
  timeLeft: number;
  timerDuration: number;
  onAnswer: (answeredAI: boolean) => void;
  onNext: () => void;
}

export function GameScreen({
  currentIndex,
  totalItems,
  score,
  currentItem,
  currentLevel,
  showResult,
  lastAnswerCorrect,
  timeLeft,
  timerDuration,
  onAnswer,
  onNext,
}: GameScreenProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-16 md:pt-20 text-center bg-yellow">
        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-3 md:border-4 border-gray-900 p-4 md:p-6 lg:p-8 max-w-2xl w-full">
          <ProgressBar
            current={currentIndex}
            total={totalItems}
            score={score}
          />

          {!showResult && (
            <TimerBar
              timeLeft={timeLeft}
              duration={timerDuration}
              questionIndex={currentIndex}
            />
          )}

          <QuestionCard question={currentItem.name} image={currentItem.image} />

          {!showResult ? (
            <AnswerButtons onAnswer={onAnswer} currentLevel={currentLevel} />
          ) : (
            <ResultFeedback
              isCorrect={lastAnswerCorrect}
              item={currentItem}
              currentLevel={currentLevel}
              onNext={onNext}
            />
          )}
        </div>
      </div>
    </>
  );
}
