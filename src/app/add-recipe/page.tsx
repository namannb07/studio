'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, addDoc, collection } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2 } from 'lucide-react';

export default function AddRecipePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [recipeName, setRecipeName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [steps, setSteps] = useState([{ step: '', time: 0 }]);

  if (loading) return <div>Loading...</div>
  if (!user) {
    router.push('/login');
    return null;
  }

  const handleStepChange = (index: number, field: string, value: string | number) => {
    const newSteps = [...steps];
    if (field === 'step') {
      newSteps[index].step = value as string;
    } else if (field === 'time') {
      newSteps[index].time = Number(value);
    }
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { step: '', time: 0 }]);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeName || !cuisine || steps.some(s => !s.step || s.time <= 0)) {
        toast({
            variant: "destructive",
            title: "Missing fields",
            description: "Please fill out all fields and ensure step times are greater than 0.",
        });
        return;
    }

    setIsSubmitting(true);
    
    try {
      const total_time = steps.reduce((total, step) => total + step.time, 0);

      await addDoc(collection(db, 'recipes'), {
        name: recipeName,
        cuisine,
        total_time,
        thumbnail: `https://placehold.co/600x400.png`,
        steps,
        authorId: user.uid,
      });

      toast({
        title: "Recipe Added!",
        description: `Your "${recipeName}" recipe has been published.`,
      });

      router.push('/');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem saving your recipe.",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Create a New Recipe</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipeName">Recipe Name</Label>
              <Input id="recipeName" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="e.g., Spicy Thai Green Curry" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine</Label>
              <Input id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="e.g., Thai" required />
            </div>

            <div className="space-y-4">
              <Label>Steps</Label>
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <span className="font-bold text-primary pt-2">{index + 1}.</span>
                  <div className="flex-grow space-y-2">
                     <Textarea value={step.step} onChange={(e) => handleStepChange(index, 'step', e.target.value)} placeholder="Describe the step" required />
                     <div className='flex items-center gap-2'>
                        <Input type="number" value={step.time} onChange={(e) => handleStepChange(index, 'time', e.target.value)} className="w-24" placeholder="Mins" required />
                        <Label htmlFor={`time-${index}`} className="text-sm text-muted-foreground">minutes</Label>
                     </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeStep(index)} className="text-destructive hover:text-destructive self-center">
                    <Trash2 />
                  </Button>
                </div>
              ))}
               <Button type="button" variant="outline" onClick={addStep}>
                  <Plus className="mr-2" />
                  Add Step
              </Button>
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Publish Recipe'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
