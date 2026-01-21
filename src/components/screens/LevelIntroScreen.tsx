import { GameButton } from "@/components/GameButton";
import Navbar from "@/components/Navbar";

interface LevelIntroScreenProps {
  level: number;
  onStartLevel: () => void;
}

export function LevelIntroScreen({
  level,
  onStartLevel,
}: LevelIntroScreenProps) {
  const getLevelTitle = () => {
    if (level === 2) return "AI-Powered?";
    if (level === 3) return "Real or AI?";
    return "AI or Not?";
  };

  const getLevelDescription = () => {
    if (level === 2) {
      return (
        <>
          Great job on Level 1! Now let's see if you can tell which things are{" "}
          <span className="font-bold text-green">AI-Powered</span> and which are
          not!
        </>
      );
    }
    if (level === 3) {
      return (
        <>
          Final challenge! Look at each image and decide if it was
          <span className="font-bold text-green"> created by AI</span> or
          <span className="font-bold text-pink"> taken by a real camera</span>!
          You can click on the image to expand it!
        </>
      );
    }
    return "Let's see how well you know AI!";
  };

  const getInstructions = () => {
    if (level === 3) {
      return (
        <>
          Tap <span className="font-bold text-green">"AI-Generated"</span> if
          you think the image was made by AI, or{" "}
          <span className="font-bold text-pink">"Real Photo"</span> if it's a
          real photograph.
        </>
      );
    }
    return (
      <>
        Tap <span className="font-bold text-green">"AI-Powered"</span> if you
        think the item uses AI, or{" "}
        <span className="font-bold text-pink">"Not AI-Powered"</span> if it
        doesn't.
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-16 md:pt-20 text-center bg-yellow">
        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] border-3 md:border-4 border-gray-900 p-5 md:p-10 lg:p-16 max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
            <span className="text-blue">Level {level}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-pink">
            {getLevelTitle()}
          </h2>

          <div className="space-y-3 md:space-y-4 my-4 md:my-8 text-base md:text-xl">
            <p>{getLevelDescription()}</p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 md:p-4 text-sm md:text-lg border-2 border-gray-900">
              <p className="text-gray-600 dark:text-gray-400">
                {getInstructions()}
              </p>
            </div>
          </div>

          <GameButton
            variant="primary"
            onPress={onStartLevel}
            className="text-lg md:text-2xl px-8 md:px-14 py-4 md:py-8"
          >
            Start Level {level}!
          </GameButton>
        </div>
      </div>
    </>
  );
}
