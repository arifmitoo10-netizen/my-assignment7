export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export type ChangeDir = "up" | "down" | "flat";

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: "kg" | "litre" | "dozen" | "piece" | string;
  image: string; // emoji
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: ChangeDir; pct: number };
  markets: Market[];
}
