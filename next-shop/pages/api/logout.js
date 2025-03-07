// pages/api/logout.js
import * as cookie from 'cookie'; // Use * as import to ensure compatibility

export default function handler(req, res) {
  // Log incoming request details for debugging
  console.log('Logout Request:', {
    method: req.method,
    cookies: req.cookies
  });

  // Only allow POST method
  if (req.method !== 'POST') {
    console.error('Invalid method for logout');
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    // Clear the JWT cookie with comprehensive options
    const clearCookie = cookie.serialize('jwt', '', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Expire immediately
      maxAge: 0 // Ensure immediate expiration
    });

    // Log cookie clearing for debugging
    console.log('Clearing Cookie:', clearCookie);

    // Set the clear cookie header
    res.setHeader('Set-Cookie', clearCookie);

    // Respond with success
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    // Log any unexpected errors
    console.error('Logout Error:', {
      message: err.message,
      stack: err.stack
    });

    // Send a server error response
    res.status(500).json({ 
      message: 'Logout failed', 
      error: err.message 
    });
  }
}