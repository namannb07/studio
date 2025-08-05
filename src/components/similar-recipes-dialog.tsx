'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { suggestSimilarRecipes, SuggestSimilarRecipesOutput } from '@/ai/flows/suggest-similar-recipes';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

interface SimilarRecipesDialogProps {
  recipeName: string;
  cuisine: string;
}

export function SimilarRecipesDialog({ recipeName, cuisine }: SimilarRecipesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestSimilarRecipesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFetchSuggestions = async () => {
    if (suggestions) return; // Don't refetch if we already have suggestions

    setIsLoading(true);
    setError(null);
    try {
      const result = await suggestSimilarRecipes({ recipeName, cuisine });
      setSuggestions(result);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with the recipe suggestion service.",
      })
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleFetchSuggestions}>
          <Sparkles className="mr-2" />
          Suggest Similar Recipes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Similar Recipe Suggestions</DialogTitle>
          <DialogDescription>
            Based on "{recipeName}", you might also like these recipes.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 min-h-[120px]">
          {isLoading && (
            <div className="flex flex-col justify-center items-center py-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4 mt-4 text-muted-foreground">Our AI chef is thinking...</p>
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {suggestions && suggestions.suggestions.length > 0 && (
            <ul className="space-y-2 list-disc list-inside text-card-foreground">
              {suggestions.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
