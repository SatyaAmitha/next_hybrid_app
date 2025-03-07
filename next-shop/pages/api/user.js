// pages/api/user.js
import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

export default async function handler(req, res) {
  // Check for JWT cookie
  const jwt = req.cookies.jwt;

  if (!jwt) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  try {
    // Validate the token with Strapi
    const response = await fetch(`${CMS_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    });

    if (!response.ok) {
      // Token is invalid or expired
      res.status(401).json({ message: 'Invalid authentication' });
      return;
    }

    const user = await response.json();

    // Return only necessary user information
    res.status(200).json({
      id: user.id,
      name: user.username,
      email: user.email
    });
  } catch (err) {
    console.error('User fetch error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}