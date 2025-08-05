export interface RecipeStep {
  step: string;
  time: number; // in minutes
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  total_time: number; // in minutes
  thumbnail: string;
  steps: RecipeStep[];
}
