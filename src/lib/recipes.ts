import { db, collection, getDocs, doc, getDoc } from './firebase';
import type { Recipe } from './types';
import { notFound } from 'next/navigation';

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    const recipes: Recipe[] = [];
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() } as Recipe);
    });
    return recipes;
  } catch (error) {
    console.error('Error reading recipes data:', error);
    return [];
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
    try {
        const docRef = doc(db, 'recipes', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Recipe;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}
