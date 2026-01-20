export interface Item {
  name: string;
  isAI: boolean;
  explanation: string;
  image?: string;
}

export type YearLevel = "primary" | "secondary" | null;
