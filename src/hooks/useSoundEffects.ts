import { useCallback, useRef } from "react";
import { SoundManager, SoundName } from "@/audio/SoundManager";

export function useSoundEffects() {
  const unlockedRef = useRef(false);

  const play = useCallback((name: SoundName) => {
    const manager = SoundManager.getInstance();
    if (!unlockedRef.current) {
      manager.unlock();
      unlockedRef.current = true;
    }
    manager.play(name);
  }, []);

  return { play };
}
