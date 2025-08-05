'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Recipe } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlarmClock, CheckCircle2, PlayCircle, PauseCircle, RotateCcw } from 'lucide-react';
import { SimilarRecipesDialog } from '@/components/similar-recipes-dialog';
import { useToast } from "@/hooks/use-toast"

export function RecipeDetailsClient({ recipe }: { recipe: Recipe }) {
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(() => Array(recipe.steps.length).fill(false));
  const { toast } = useToast();

  const activeStep = activeStepIndex !== null ? recipe.steps[activeStepIndex] : null;

  const markStepAsCompleted = useCallback((index: number) => {
    setCompletedSteps(prev => {
        const newCompleted = [...prev];
        if (!newCompleted[index]) {
            newCompleted[index] = true;
        }
        return newCompleted;
    });
  }, []);

  const handleStartTimer = useCallback((index: number) => {
    setActiveStepIndex(index);
    setTimer(recipe.steps[index].time * 60);
    setIsTimerRunning(true);
  }, [recipe.steps]);

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResumeTimer = () => {
    if (activeStepIndex !== null && timer > 0) {
      setIsTimerRunning(true);
    }
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    if(activeStepIndex !== null) {
        setTimer(recipe.steps[activeStepIndex].time * 60);
    }
  };
  
  const advanceToNextStep = useCallback(() => {
    if (activeStepIndex === null) return;

    markStepAsCompleted(activeStepIndex);
    const nextStepIndex = activeStepIndex + 1;
    
    if (nextStepIndex < recipe.steps.length) {
        handleStartTimer(nextStepIndex);
        toast({
          title: "Next Step!",
          description: `Starting timer for: ${recipe.steps[nextStepIndex].step}`,
        })
    } else {
        setActiveStepIndex(null);
        setIsTimerRunning(false);
        toast({
          title: "Recipe Complete!",
          description: "Congratulations, you've finished all the steps.",
        })
    }
  }, [activeStepIndex, recipe.steps, handleStartTimer, markStepAsCompleted, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timer === 0) {
      setIsTimerRunning(false);
       if (activeStepIndex !== null) {
         markStepAsCompleted(activeStepIndex);
       }
      if (autoAdvance) {
        advanceToNextStep();
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timer, autoAdvance, advanceToNextStep, activeStepIndex, markStepAsCompleted]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (activeStepIndex === null || !activeStep) return 0;
    const totalDuration = activeStep.time * 60;
    if (totalDuration === 0) return 100;
    return ((totalDuration - timer) / totalDuration) * 100;
  };
  
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
            <Switch
                id="auto-advance"
                checked={autoAdvance}
                onCheckedChange={setAutoAdvance}
                aria-label="Auto-advance to next step"
            />
            <Label htmlFor="auto-advance">Auto-advance to next step</Label>
        </div>
        <SimilarRecipesDialog recipeName={recipe.name} cuisine={recipe.cuisine} />
      </div>

      <div className="space-y-4">
        {recipe.steps.map((step, index) => (
          <Card
            key={index}
            className={`transition-all duration-300 ${activeStepIndex === index ? 'border-primary ring-2 ring-primary shadow-lg' : ''} ${completedSteps[index] ? 'bg-muted/50 opacity-80' : ''}`}
          >
            <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <span className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold transition-colors ${completedSteps[index] ? 'bg-accent text-accent-foreground' : activeStepIndex === index ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                    {completedSteps[index] ? <CheckCircle2 size={20} /> : index + 1}
                </span>
                <div>
                  <CardTitle className="text-xl font-body font-bold">{step.step}</CardTitle>
                  <p className="text-muted-foreground flex items-center mt-1 text-sm">
                    <AlarmClock className="h-4 w-4 mr-1.5" />
                    Estimated time: {step.time} min
                  </p>
                </div>
              </div>

              {activeStepIndex !== index && (
                <Button variant="outline" size="sm" onClick={() => handleStartTimer(index)} disabled={isTimerRunning && activeStepIndex !== index}>
                  <PlayCircle className="mr-2" /> Start
                </Button>
              )}
            </CardHeader>
            
            {activeStepIndex === index && (
              <CardContent>
                <div className="bg-secondary/30 dark:bg-secondary/20 p-4 rounded-lg">
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <p className="font-mono text-5xl font-bold text-primary">{formatTime(timer)}</p>
                  </div>
                  <Progress value={getProgress()} className="w-full h-2 mb-4" />
                  <div className="flex justify-center items-center gap-2">
                    {isTimerRunning ? (
                      <Button variant="secondary" onClick={handlePauseTimer}>
                        <PauseCircle className="mr-2" /> Pause
                      </Button>
                    ) : (
                      <Button onClick={handleResumeTimer} disabled={timer === 0}>
                        <PlayCircle className="mr-2" /> {timer < recipe.steps[index].time * 60 ? 'Resume' : 'Start'}
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={handleResetTimer}>
                      <RotateCcw />
                      <span className="sr-only">Reset timer</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
