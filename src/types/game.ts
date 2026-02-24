export interface Item {
  name: string;
  isAI: boolean;
  explanation: string;
  image?: string;
}

export interface LevelScore {
  level: number;
  score: number;
  total: number;
}

export type YearLevel = "primary" | "secondary" | null;
