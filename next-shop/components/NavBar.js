import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchJson } from '../lib/api';

function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await fetchJson('/api/user');
        setUser(user);
      } catch (err) {
        // Silently handle errors (user is not authenticated)
        setUser(null);
      }
    })();
  }, []);

  async function handleSignOut(event) {
    event.preventDefault(); // Prevent default link behavior
    try {
      // Clear user state optimistically
      setUser(null);
      setError(null);

      // Call the sign-out API route
      await fetchJson('/api/logout', { method: 'POST' });
      
      // Redirect to home page or sign-in page
      router.push('/sign-in');
    } catch (err) {
      console.error('Sign out failed:', err);
      
      // Set error state to show user
      setError('Failed to sign out. Please try again.');
      
      // Restore user state if logout failed
      try {
        const user = await fetchJson('/api/user');
        setUser(user);
      } catch {
        setUser(null);
      }
    }
  }

  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2">
        {/* Always visible links */}
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />

        {/* Error message */}
        {error && (
          <li className="text-red-500 mr-4">
            {error}
          </li>
        )}

        {/* Conditional rendering based on authentication */}
        {user ? (
          <>
            <li>Welcome, {user.name}</li>
            <li>
              <a 
                href="#" 
                onClick={handleSignOut}
                className="hover:text-red-500 transition-colors"
              >
                Sign Out
              </a>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;