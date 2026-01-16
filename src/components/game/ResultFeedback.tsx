import { GameButton } from "@/components/GameButton";
import { Item } from "@/types/game";

interface ResultFeedbackProps {
  isCorrect: boolean;
  item: Item;
  currentLevel: number;
  onNext: () => void;
}

export function ResultFeedback({
  isCorrect,
  item,
  currentLevel,
  onNext,
}: ResultFeedbackProps) {
  const getAnswerLabel = () => {
    if (currentLevel === 1) {
      return item.isAI ? "AI" : "Not AI";
    }
    return item.isAI ? "AI-Powered" : "Not AI-Powered";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div
        className={`rounded-xl md:rounded-2xl p-4 md:p-8 border-3 md:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] ${
          isCorrect ? "bg-green/20" : "bg-orange/20"
        }`}
      >
        <p
          className={`text-2xl md:text-4xl font-bold mb-2 md:mb-3 ${
            isCorrect ? "text-green" : "text-orange"
          }`}
        >
          {isCorrect ? "Correct! ✓" : "Not quite ✗"}
        </p>
        <p className="text-base md:text-xl mb-3 md:mb-4">
          {item.name} is{" "}
          <span
            className={`font-bold ${item.isAI ? "text-green" : "text-pink"}`}
          >
            {getAnswerLabel()}
          </span>
        </p>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-left">
          {item.explanation}
        </p>
      </div>

      <GameButton
        variant="primary"
        onPress={onNext}
        className="text-lg md:text-2xl px-8 md:px-12 py-4 md:py-8"
      >
        Next →
      </GameButton>
    </div>
  );
}
