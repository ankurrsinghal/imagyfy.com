export type GradientType = string;

export interface Gradient {
  id: string;
  gradient: GradientType;
}

export type CanvasMode = "Twitter" | "Upload";

export interface Font {
  id: string;
  name: string;
  url: string;
  isLoaded: boolean;
}