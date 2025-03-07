// pages/api/login.js
import * as cookie from 'cookie'; // Change import to use * as
import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

async function handleLogin(req, res) {
  console.log('Login Request:', {
    method: req.method,
    body: req.body,
    CMS_URL: CMS_URL
  });

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    // Use fetch directly to get more detailed error information
    const response = await fetch(`${CMS_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        identifier: email, 
        password 
      }),
    });

    // Log the raw response status and headers
    console.log('Strapi Response Status:', response.status);
    console.log('Strapi Response Headers:', Object.fromEntries(response.headers.entries()));

    // Parse the response body
    const data = await response.json();

    // Log the parsed data
    console.log('Strapi Response Data:', data);

    // Check if authentication was successful
    if (!response.ok) {
      console.error('Authentication Failed:', data);
      res.status(response.status).json({ 
        message: data.message || 'Authentication failed',
        error: data.error || 'Unauthorized'
      });
      return;
    }

    // Validate the response structure
    if (!data.jwt || !data.user) {
      console.error('Invalid response structure:', data);
      res.status(500).json({ 
        message: 'Invalid authentication response',
        data: data
      });
      return;
    }

    // Set cookie with more comprehensive options
    res.setHeader('Set-Cookie', cookie.serialize('jwt', data.jwt, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    }));

    // Send response
    res.status(200).json({
      id: data.user.id,
      name: data.user.username,
    });
  } catch (err) {
    // Log the full error details
    console.error('Login API Catch Error:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });

    res.status(500).json({ 
      message: 'Internal server error', 
      error: err.message,
      details: err.toString()
    });
  }
}

export default handleLogin;