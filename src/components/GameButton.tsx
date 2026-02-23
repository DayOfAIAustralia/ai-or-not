import { Button } from "@heroui/button";
import { ReactNode } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

type ButtonVariant = "primary" | "secondary" | "pink" | "selector" | "selectorActive";

interface GameButtonProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  pink: "bg-pink text-white",
  selector: "bg-white text-gray-900",
  selectorActive: "bg-green text-white",
};

export function GameButton({
  variant = "primary",
  size = "lg",
  children,
  onPress,
  isDisabled,
  className = "",
}: GameButtonProps) {
  const { play } = useSoundEffects();

  const baseStyles = `font-bold border-3 md:border-4 border-gray-900
    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]
    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px]
    transition-all`;

  const handlePress = () => {
    play("click");
    onPress?.();
  };

  return (
    <Button
      size={size}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onPress={handlePress}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}
