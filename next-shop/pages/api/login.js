// pages/api/login.js

function handleLogin(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  console.log('req.body:', req.body);
  // Here you would normally authenticate the user and get the JWT
  const token = 'your-jwt-token'; // Placeholder for the actual token

  // Set the cookie with the token
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);

  res.status(200).json({ message: 'Logged in successfully' });
}

export default handleLogin;