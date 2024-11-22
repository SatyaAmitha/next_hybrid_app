// pages/api/login.js

import { fetchJson } from '../../lib/api';

async function handleLogin(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, password } = req.body;

  try {
    const { jwt, user } = await fetchJson('http://localhost:1337/auth/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    });

    // TODO: Set jwt cookie

    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (err) {
    res.status(401).end(); // Unauthorized
  }
}

export default handleLogin;