// components/UserProfile.js

import { useQuery } from 'react-query';
import { fetchJson } from '../lib/api';

function UserProfile() {
  const { data: user, isLoading, error } = useQuery('user', () => fetchJson('/api/user'));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
    </div>
  );
}

export default UserProfile;