import { useState } from "react";
import { AboutModal } from "./AboutModal";

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b-4 border-black px-4 md:px-18 py-2 md:py-6 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="/logos/doai-logo.png"
              alt="Day of AI"
              className="h-10 md:h-18"
            />
            <span className="font-bold text-gray-900 ml-2 md:ml-4 text-xl md:text-4xl">
              AI or Not?
            </span>
          </div>

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
      </nav>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
};

export default Navbar;
