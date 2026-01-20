interface QuestionCardProps {
  question: string;
  image?: string;
}

export function QuestionCard({ question, image }: QuestionCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 mb-4 md:mb-8 border-3 md:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
      {image && (
        <img
          src={image}
          alt="Question image"
          className="w-full max-h-64 md:max-h-80 object-contain rounded-lg mb-4 border-2 border-gray-900"
        />
      )}
      <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">{question}</h1>
    </div>
  );
}
