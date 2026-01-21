interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center pt-20 md:pt-28"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className="relative bg-white border-4 border-gray-900 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] p-6 md:p-8 max-w-lg w-[90%] mx-4 animate-slideDown h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-bold text-xl"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Content */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          About AI or Not?
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          AI or Not? is an interactive game that challenges you to distinguish
          between AI-generated content and human-created content. Test your
          skills and learn about the capabilities of modern AI systems!
        </p>

        {/* Logos */}
        <div className="flex justify-center gap-6 md:gap-8 border-t-1 border-gray-400">
          <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <img src="logos/doai-logo.png" className="max-h-22" />
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <img src="logos/unsw.png" className="max-h-22" />
          </div>
        </div>
      </div>
    </div>
  );
}
