type SoundName =
  | "correct"
  | "wrong"
  | "tick"
  | "timeUp"
  | "levelStart"
  | "levelComplete"
  | "celebration"
  | "click";

const SOUND_FILES: Record<SoundName, string> = {
  correct: "/sounds/correct.mp3",
  wrong: "/sounds/wrong.mp3",
  tick: "/sounds/tick.mp3",
  timeUp: "/sounds/time-up.mp3",
  levelStart: "/sounds/level-start.mp3",
  levelComplete: "/sounds/level-complete.mp3",
  celebration: "/sounds/celebration.mp3",
  click: "/sounds/click.mp3",
};

class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<SoundName, HTMLAudioElement> = new Map();
  private muted = false;
  private unlocked = false;

  private constructor() {
    this.preload();
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private preload() {
    for (const [name, path] of Object.entries(SOUND_FILES)) {
      const audio = new Audio(path);
      audio.preload = "auto";
      this.sounds.set(name as SoundName, audio);
    }
  }

  /** Call on first user interaction to unlock audio on iOS Safari */
  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    // Play and immediately pause a silent buffer to unlock audio on mobile
    this.sounds.forEach((audio) => {
      audio.load();
    });
  }

  play(name: SoundName) {
    if (this.muted) return;
    const audio = this.sounds.get(name);
    if (!audio) return;
    // Reset to start so rapid replays work (e.g. tick, click)
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Silently ignore autoplay restrictions
    });
  }

  stop(name: SoundName) {
    const audio = this.sounds.get(name);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (muted) {
      // Stop all currently playing sounds
      this.sounds.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }

  isMuted(): boolean {
    return this.muted;
  }
}

export { SoundManager };
export type { SoundName };
