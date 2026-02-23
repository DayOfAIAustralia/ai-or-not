import { GameButton } from "@/components/GameButton";
import Navbar from "@/components/Navbar";
import { YearLevel } from "@/types/game";

interface LandingScreenProps {
  yearLevel: YearLevel;
  onYearLevelChange: (level: "primary" | "secondary") => void;
  onStartGame: () => void;
}

export function LandingScreen({
  yearLevel,
  onYearLevelChange,
  onStartGame,
}: LandingScreenProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-16 md:pt-20 text-center bg-yellow">
        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-3 md:border-4 border-gray-900 p-5 md:p-8 lg:p-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-blue">AI or Not AI?</span>
          </h1>

          <div className="space-y-3 md:space-y-4 my-4 md:my-6 text-base md:text-lg">
            <p>
              Some things use <span className="font-bold text-blue">AI</span>{" "}
              (Artificial Intelligence) and some don't.
            </p>
            <p className="text-lg md:text-xl font-semibold text-pink">
              Can you tell which is which?
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 md:p-4 text-sm md:text-lg border-2 border-gray-900">
              <p className="text-gray-600 dark:text-gray-400">
                Tap <span className="font-bold text-green">"AI"</span> if you
                think it uses AI, or{" "}
                <span className="font-bold text-pink">"Not AI"</span> if it
                doesn't.
              </p>
            </div>
          </div>

          <div className="mb-3 md:mb-5">
            <p className="text-base md:text-lg font-medium mb-2 md:mb-3 text-gray-700 dark:text-gray-300">
              Select your year level:
            </p>
            <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
              <GameButton
                variant={yearLevel === "primary" ? "selectorActive" : "selector"}
                onPress={() => onYearLevelChange("primary")}
                className="text-sm md:text-lg px-3 md:px-5 py-3 md:py-4"
              >
                Primary (Years 3-6)
              </GameButton>
              <GameButton
                variant={yearLevel === "secondary" ? "selectorActive" : "selector"}
                onPress={() => onYearLevelChange("secondary")}
                className="text-sm md:text-lg px-3 md:px-5 py-3 md:py-4"
              >
                Secondary (Years 7-10)
              </GameButton>
            </div>
          </div>

          <GameButton
            variant="primary"
            isDisabled={yearLevel === null}
            onPress={onStartGame}
            className="text-lg md:text-xl px-8 md:px-10 py-4 md:py-6"
          >
            Play!
          </GameButton>
        </div>
      </div>
    </>
  );
}
