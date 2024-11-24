// pages/api/user.js

import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

async function handleUser(req, res) {
  const { jwt } = req.cookies; // Extract JWT from cookies
  if (!jwt) {
    res.status(401).end(); // Return unauthorized if JWT is missing
    return;
  }
  try {
    // Fetch user details from the CMS
    const user = await fetchJson(`${CMS_URL}/users/me`, {
      headers: { 'Authorization': `Bearer ${jwt}` },
    });
    // Return user ID and name
    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (err) {
    res.status(401).end(); // Return unauthorized on error
  }
}

export default handleUser;