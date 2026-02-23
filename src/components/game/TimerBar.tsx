interface TimerBarProps {
  timeLeft: number;
  duration: number;
  questionIndex: number;
}

export function TimerBar({ timeLeft, duration, questionIndex }: TimerBarProps) {
  const isLow = timeLeft <= 3;
  const formattedTime = `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;

  return (
    <div className="mt-4 mb-4 md:mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs md:text-sm font-medium text-gray-600">
          Time
        </span>
        <span
          className={`text-sm md:text-base font-bold ${isLow ? "text-red-500" : "text-gray-700"}`}
        >
          {formattedTime}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 border border-gray-900">
        <div
          key={questionIndex}
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isLow ? "bg-red-500" : "bg-green"
          }`}
          style={{ width: `${(timeLeft / duration) * 100}%` }}
        />
      </div>
    </div>
  );
}
