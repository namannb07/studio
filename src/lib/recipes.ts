import fs from 'fs';
import path from 'path';
import type { Recipe } from './types';

const recipesFilePath = path.join(process.cwd(), 'src/data/recipes.json');

export function getRecipes(): Recipe[] {
  try {
    const jsonData = fs.readFileSync(recipesFilePath, 'utf-8');
    const recipes = JSON.parse(jsonData);
    return recipes;
  } catch (error) {
    console.error('Error reading recipes data:', error);
    return [];
  }
}

export function getRecipeById(id: string): Recipe | undefined {
  const recipes = getRecipes();
  return recipes.find(recipe => recipe.id === id);
}
