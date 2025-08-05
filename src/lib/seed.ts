import { db, collection, getDocs, addDoc } from './firebase';

const sampleRecipes = [
  {
    name: 'Spaghetti Carbonara',
    cuisine: 'Italian',
    total_time: 30,
    thumbnail: 'https://placehold.co/600x400.png',
    authorId: 'system',
    steps: [
      { step: 'Cook pasta according to package directions.', time: 12 },
      { step: 'Meanwhile, cook pancetta in a large skillet.', time: 8 },
      { step: 'Whisk eggs, cheese, and black pepper.', time: 5 },
      { step: 'Drain pasta, reserving some water. Add pasta to skillet with pancetta.', time: 2 },
      { step: 'Remove from heat and quickly stir in egg mixture.', time: 3 },
    ],
  },
  {
    name: 'Classic Beef Tacos',
    cuisine: 'Mexican',
    total_time: 25,
    thumbnail: 'https://placehold.co/600x400.png',
    authorId: 'system',
    steps: [
      { step: 'Brown ground beef in a skillet; drain fat.', time: 10 },
      { step: 'Stir in taco seasoning and water.', time: 2 },
      { step: 'Simmer for 5 minutes.', time: 5 },
      { step: 'Warm taco shells.', time: 3 },
      { step: 'Assemble tacos with beef, lettuce, cheese, and tomatoes.', time: 5 },
    ],
  },
   {
    name: 'Chicken Alfredo',
    cuisine: 'Italian',
    total_time: 40,
    thumbnail: 'https://placehold.co/600x400.png',
    authorId: 'system',
    steps: [
      { step: 'Cook fettuccine pasta.', time: 10 },
      { step: 'Season and cook chicken breasts in a skillet.', time: 15 },
      { step: 'Make Alfredo sauce with butter, garlic, heavy cream, and Parmesan.', time: 10 },
      { step: 'Slice chicken, and combine everything.', time: 5 },
    ],
  },
  {
    name: 'Vegetable Stir-fry',
    cuisine: 'Asian',
    total_time: 20,
    thumbnail: 'https://placehold.co/600x400.png',
    authorId: 'system',
    steps: [
        { step: 'Chop all your vegetables.', time: 7 },
        { step: 'Heat oil in a wok or large skillet.', time: 1 },
        { step: 'Stir-fry garlic and ginger until fragrant.', time: 1 },
        { step: 'Add hard vegetables (like carrots and broccoli) and cook for a few minutes.', time: 5 },
        { step: 'Add softer vegetables (like bell peppers and mushrooms) and cook until tender-crisp.', time: 4 },
        { step: 'Pour in soy sauce mixture and toss to coat.', time: 2 },
    ],
  }
];

export const seedDatabase = async () => {
  const recipesCollection = collection(db, 'recipes');
  const snapshot = await getDocs(recipesCollection);

  if (snapshot.empty) {
    console.log('No recipes found, seeding database...');
    for (const recipe of sampleRecipes) {
      await addDoc(recipesCollection, recipe);
    }
    console.log('Database seeded!');
  } else {
    console.log('Database already contains recipes, skipping seed.');
  }
};
