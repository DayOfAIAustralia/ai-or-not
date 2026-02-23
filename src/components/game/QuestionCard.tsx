import { useState } from "react";
import { ImageModal } from "../ImageModal";

interface QuestionCardProps {
  question: string;
  image?: string;
}

export function QuestionCard({ question, image }: QuestionCardProps) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border-3 md:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
      {image && (
        <>
          <img
            src={image}
            alt="Question image"
            className="w-full max-h-48 md:max-h-64 object-contain mb-4 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIsImageExpanded(true)}
          />
          <ImageModal
            isOpen={isImageExpanded}
            onClose={() => setIsImageExpanded(false)}
            imageSrc={image}
            imageAlt="Question image"
          />
        </>
      )}
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold">{question}</h1>
    </div>
  );
}
