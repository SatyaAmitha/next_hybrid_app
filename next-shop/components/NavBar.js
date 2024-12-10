// File: components/NavBar.js

import Link from 'next/link';
import { useSignOut, useUser } from '../hooks/user';

function NavBar() {
  const user = useUser();
  const signOut = useSignOut();

  console.log('[NavBar] user:', user);
  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li>Welcome, {user.name}</li>
            <li>
              <button onClick={signOut}>Sign Out</button>
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