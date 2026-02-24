import { useCallback, useRef } from "react";
import { SoundManager, SoundName } from "@/audio/SoundManager";

export function useSoundEffects() {
  const unlockedRef = useRef(false);

  const ensureUnlocked = useCallback(() => {
    if (!unlockedRef.current) {
      SoundManager.getInstance().unlock();
      unlockedRef.current = true;
    }
  }, []);

  const play = useCallback((name: SoundName) => {
    ensureUnlocked();
    SoundManager.getInstance().play(name);
  }, [ensureUnlocked]);

  const stop = useCallback((name: SoundName) => {
    SoundManager.getInstance().stop(name);
  }, []);

  return { play, stop };
}
