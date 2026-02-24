import { useEffect } from "react";
import { GameButton } from "@/components/GameButton";
import Navbar from "@/components/Navbar";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { LevelScore } from "@/types/game";

const LEVEL_LEARNINGS: Record<number, string> = {
  1: "We learnt that AI is all around us, from voice assistants to recommendation systems!",
  2: "We learnt that many everyday tools are AI-powered, even when we don't realise it!",
  3: "We learnt that AI can generate realistic images, and it's important to think critically about what we see online!",
};

interface FinalFeedbackScreenProps {
  levelScores: LevelScore[];
  onBackToStart: () => void;
}

export function FinalFeedbackScreen({
  levelScores,
  onBackToStart,
}: FinalFeedbackScreenProps) {
  const { play } = useSoundEffects();

  const totalScore = levelScores.reduce((sum, ls) => sum + ls.score, 0);
  const totalQuestions = levelScores.reduce((sum, ls) => sum + ls.total, 0);
  const overallPercentage =
    totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  useEffect(() => {
    play("celebration");
  }, [play]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 pt-16 md:pt-20 text-center bg-yellow">
        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-3 md:border-4 border-gray-900 p-4 md:p-6 lg:p-8 max-w-2xl w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-blue">
            Game Complete!
          </h1>

          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 mb-3 md:mb-4 border-3 md:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
            <p className="text-lg md:text-xl mb-1 md:mb-2">Overall Score</p>
            <p className="text-3xl md:text-4xl font-bold text-green mb-1 md:mb-2">
              {totalScore} / {totalQuestions}
            </p>
            <p className="text-lg md:text-xl font-semibold text-yellow">
              {overallPercentage}% correct!
            </p>
          </div>

          <div className="flex flex-col gap-2 md:gap-3 mb-4 md:mb-5">
            {levelScores
              .sort((a, b) => a.level - b.level)
              .map((ls) => (
                <div
                  key={ls.level}
                  className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 border-3 md:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] text-left"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg md:text-xl font-bold">
                      Level {ls.level}
                    </span>
                    <span className="text-lg md:text-xl font-bold text-green">
                      {ls.score} / {ls.total}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-gray-700">
                    {LEVEL_LEARNINGS[ls.level]}
                  </p>
                </div>
              ))}
          </div>

          <GameButton
            variant="pink"
            onPress={onBackToStart}
            className="text-lg md:text-xl px-8 md:px-10 py-3 md:py-4"
          >
            Back to Start
          </GameButton>
        </div>
      </div>
    </>
  );
}
