import { HeroUIProvider } from "@heroui/system";
import { SoundProvider } from "@/contexts/SoundContext";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <SoundProvider>{children}</SoundProvider>
    </HeroUIProvider>
  );
}
