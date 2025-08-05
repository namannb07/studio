import Link from 'next/link';
import Image from 'next/image';
import type { Recipe } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 bg-card">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={recipe.thumbnail}
              alt={`Image of ${recipe.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={`${recipe.cuisine.toLowerCase()} food`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2 uppercase tracking-wider text-xs">{recipe.cuisine}</Badge>
          <CardTitle className="font-headline text-2xl leading-tight mb-2">{recipe.name}</CardTitle>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="mr-2 h-4 w-4" />
            <span>{recipe.total_time} minutes</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
