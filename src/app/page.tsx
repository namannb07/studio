import { RecipeList } from '@/components/recipe-list';
import { getRecipes } from '@/lib/recipes';

export default function Home() {
  const recipes = getRecipes();

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">StepChef</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your companion for delicious home-cooked meals.</p>
      </header>
      <RecipeList recipes={recipes} />
    </main>
  );
}
