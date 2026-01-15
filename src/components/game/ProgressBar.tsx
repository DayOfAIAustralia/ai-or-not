interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export function ProgressBar({ current, total, score }: ProgressBarProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-3 md:mb-6">
        <span className="text-sm md:text-base font-medium text-gray-500">
          Question {current + 1} of {total}
        </span>
        <span className="bg-yellow text-gray-900 font-bold px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base">
          Score: {score}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 md:h-4 mb-3 md:mb-4 border-2 border-gray-900">
        <div
          className="bg-blue h-2 md:h-3 rounded-full transition-all duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </>
  );
}
