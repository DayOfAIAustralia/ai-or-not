import { GameButton } from "@/components/GameButton";

interface AnswerButtonsProps {
  onAnswer: (answeredAI: boolean) => void;
  currentLevel: number;
}

export function AnswerButtons({ onAnswer, currentLevel }: AnswerButtonsProps) {
  const isLevel1 = currentLevel === 1;
  const buttonMaxWidth = isLevel1
    ? "max-w-[140px] md:max-w-[180px]"
    : "max-w-[160px] md:max-w-[220px]";

  return (
    <div className="flex gap-3 md:gap-6 justify-center">
      <GameButton
        variant="secondary"
        onPress={() => onAnswer(true)}
        className={`text-base md:text-xl px-4 md:px-8 py-4 md:py-8 flex-1 ${buttonMaxWidth}`}
      >
        {isLevel1 ? "AI" : "AI-Powered"}
      </GameButton>
      <GameButton
        variant="pink"
        onPress={() => onAnswer(false)}
        className={`text-base md:text-xl px-4 md:px-8 py-4 md:py-8 flex-1 ${buttonMaxWidth}`}
      >
        {isLevel1 ? "Not AI" : "Not AI-Powered"}
      </GameButton>
    </div>
  );
}
