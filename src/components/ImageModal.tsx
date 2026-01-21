import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
}

export function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt = "Expanded image",
}: ImageModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className="relative animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 rounded-full border-3 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-colors font-bold text-xl z-10"
          aria-label="Close image"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]"
        />
      </div>
    </div>
  );
}
