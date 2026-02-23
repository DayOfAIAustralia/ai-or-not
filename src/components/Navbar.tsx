import { useState } from "react";
import { AboutModal } from "./AboutModal";
import { useSoundContext } from "@/contexts/SoundContext";

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { isMuted, toggleMute } = useSoundContext();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b-4 border-black px-4 md:px-10 py-2 md:py-3 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="/logos/doai-logo.png"
              alt="Day of AI"
              className="h-10 md:h-14"
            />
            <span className="font-bold text-gray-900 ml-2 md:ml-3 text-xl md:text-2xl">
              AI or Not?
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleMute}
              className="font-bold border-3 md:border-4 border-gray-900 bg-white text-gray-900 px-3 py-2 rounded-lg
                shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]
                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px]
                transition-all text-sm md:text-base"
              aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsAboutOpen(true)}
              className="font-bold border-3 md:border-4 border-gray-900 bg-white text-gray-900 px-4 py-2 rounded-lg
                shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]
                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px]
                transition-all text-sm md:text-base"
            >
              About
            </button>
          </div>
        </div>
      </nav>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
};

export default Navbar;
