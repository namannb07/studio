'use server';

/**
 * @fileOverview This file implements the Genkit flow for suggesting similar recipes based on a given recipe.
 *
 * The flow takes a recipe name and cuisine as input and returns a list of similar recipe suggestions.
 * - suggestSimilarRecipes - A function that handles the recipe suggestion process.
 * - SuggestSimilarRecipesInput - The input type for the suggestSimilarRecipes function.
 * - SuggestSimilarRecipesOutput - The return type for the suggestSimilarRecipes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSimilarRecipesInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe to find similar recipes for.'),
  cuisine: z.string().describe('The cuisine of the recipe.'),
});
export type SuggestSimilarRecipesInput = z.infer<typeof SuggestSimilarRecipesInputSchema>;

const SuggestSimilarRecipesOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of similar recipe suggestions.'),
});
export type SuggestSimilarRecipesOutput = z.infer<typeof SuggestSimilarRecipesOutputSchema>;

export async function suggestSimilarRecipes(input: SuggestSimilarRecipesInput): Promise<SuggestSimilarRecipesOutput> {
  return suggestSimilarRecipesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSimilarRecipesPrompt',
  input: {schema: SuggestSimilarRecipesInputSchema},
  output: {schema: SuggestSimilarRecipesOutputSchema},
  prompt: `You are a recipe suggestion expert. Given a recipe name and its cuisine, you will suggest a list of similar recipes.

Recipe Name: {{{recipeName}}}
Cuisine: {{{cuisine}}}

Suggest 5 similar recipes:
`,
});

const suggestSimilarRecipesFlow = ai.defineFlow(
  {
    name: 'suggestSimilarRecipesFlow',
    inputSchema: SuggestSimilarRecipesInputSchema,
    outputSchema: SuggestSimilarRecipesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
