// File: components/NavBar.js

import Link from 'next/link';
import { useUser } from '../hooks/user';
import { fetchJson } from '../lib/api';

function NavBar() {
  const user = useUser();

  const handleSignOut = async () => {
    await fetchJson('/api/logout');
  };

  return (
    <nav>
      {user ? (
        <span>Signed in as {user.name}</span>
      ) : (
        <span>Not signed in</span>
      )}
      <button onClick={handleSignOut}>Sign out</button>
    </nav>
  );
}

export default NavBar;