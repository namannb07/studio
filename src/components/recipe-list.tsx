'use client';

import { useState, useEffect } from 'react';
import type { Recipe } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { RecipeCard } from '@/components/recipe-card';
import { Search } from 'lucide-react';
import { getRecipes } from '@/lib/recipes';
import { seedDatabase } from '@/lib/seed';
import { Skeleton } from '@/components/ui/skeleton';

export function RecipeList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSeed = async () => {
      await seedDatabase();
      const fetchedRecipes = await getRecipes();
      setRecipes(fetchedRecipes);
      setLoading(false);
    };
    fetchAndSeed();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-8 max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          aria-label="Search for a recipe"
          placeholder="Search for a recipe..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No recipes found. Try adding one!</p>
        </div>
      )}
    </div>
  );
}
