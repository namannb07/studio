'use client';

import { getRecipeById } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { RecipeDetailsClient } from '@/components/recipe-details-client';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface RecipePageProps {
  params: { id: string };
}

export default function RecipePage({ params }: RecipePageProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetchedRecipe = await getRecipeById(params.id);
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
      }
      setLoading(false);
    };
    fetchRecipe();
  }, [params.id]);

  if (loading) {
    return (
        <div className="min-h-screen">
             <div className="bg-card md:rounded-xl md:shadow-lg md:max-w-6xl md:mx-auto my-0 md:my-8">
                <Skeleton className="h-64 md:h-96 w-full md:rounded-t-xl" />
                <div className="p-8">
                    <Skeleton className="h-8 w-1/4 mb-4" />
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-1/2 mb-8" />
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="bg-card md:rounded-xl md:shadow-lg md:max-w-6xl md:mx-auto my-0 md:my-8">
        <div className="relative h-64 md:h-96 w-full md:rounded-t-xl overflow-hidden">
          <Image
            src={recipe.thumbnail}
            alt={`Image of ${recipe.name}`}
            fill
            className="object-cover"
            data-ai-hint={`${recipe.cuisine.toLowerCase()} food`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <Badge variant="secondary" className="mb-2 uppercase tracking-wider text-xs">{recipe.cuisine}</Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white">{recipe.name}</h1>
            <div className="flex items-center text-gray-200 mt-2">
              <Clock className="mr-2 h-5 w-5" />
              <span>Total time: {recipe.total_time} minutes</span>
            </div>
          </div>
        </div>
        <RecipeDetailsClient recipe={recipe} />
      </div>
    </div>
  );
}
