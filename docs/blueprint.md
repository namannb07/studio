# **App Name**: StepChef

## Core Features:

- Recipe List Screen: Display a list of recipes with names, thumbnails, and total time. Allow users to search for recipes.
- Recipe Detail Screen: Show the details of a selected recipe, including a list of steps, each with a description and estimated time.
- Step Timer: Implement a timer for each step, which starts a countdown when activated.
- Auto-Advance: Optionally advance to the next step automatically when the timer for the current step expires.
- Recipe Suggestion: AI-powered recipe suggestion tool: suggest similar recipes based on a selected recipe. The LLM tool incorporates knowledge of cuisine type to create a realistic output.
- JSON Data Loading: Load recipe data from JSON files.

## Style Guidelines:

- Primary color: Earthy orange (#D2691E), reminiscent of spices and cooking.
- Background color: Light beige (#F5F5DC) provides a clean, appetizing backdrop.
- Accent color: Muted olive green (#808000) complements the primary orange and evokes natural ingredients.
- Headline font: 'Playfair' serif, for recipe names and headings, providing elegance. Note: currently only Google Fonts are supported.
- Body font: 'PT Sans' sans-serif for step descriptions and other text, for good readability. Note: currently only Google Fonts are supported.
- Use clean, modern icons to represent cooking actions (e.g., chopping, stirring).
- Employ a card-based layout for recipes in the list and a step-by-step linear layout for the recipe detail screen.