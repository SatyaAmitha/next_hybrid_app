import Link from 'next/link';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { fetchJson } from '../lib/api';

function NavBar() {
  const router = useRouter();

  // Fetch user data using useQuery
  const { data: user, error, refetch } = useQuery(
    'user',
    async () => {
      try {
        return await fetchJson('/api/user');
      } catch {
        return null; // User not authenticated
      }
    },
    {
      staleTime: 30_000, // Fresh for 30 seconds
      cacheTime: Infinity, // Cache indefinitely
    }
  );

  // Handle sign-out logic
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      await fetchJson('/api/logout', { method: 'POST' });
      await refetch(); // Refresh the user query
      router.push('/sign-in'); // Redirect to sign-in
    } catch (err) {
      console.error('Sign-out failed:', err);
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <nav className="px-4 py-2 bg-gray-200 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href="/">Next Shop</Link>
      </div>
      <ul className="flex gap-4">
        {user ? (
          <>
            <li>Welcome, {user.name}</li>
            <li>
              <a
                href="#"
                onClick={handleSignOut}
                className="text-red-500 hover:underline"
              >
                Sign Out
              </a>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
