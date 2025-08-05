'use client'
import { RecipeList } from '@/components/recipe-list';
import { useAuth } from '@/hooks/use-auth';
import { auth, signOut } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <div className="flex justify-end gap-2 mb-4">
          {user ? (
            <>
              <Button asChild>
                <Link href="/add-recipe">Add Recipe</Link>
              </Button>
              <Button variant="secondary" onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <p className="text-muted-foreground mt-2 text-lg">Your companion for delicious home-cooked meals.</p>
      </header>
      <RecipeList />
    </main>
  );
}
