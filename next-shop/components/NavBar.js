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
                {user && (
          <>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </>
        )}
        <li role="separator" className="flex-1" />
      </ul>
    </nav>
  );
}

export default NavBar;