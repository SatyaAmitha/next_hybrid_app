// File: api/cart.js

import { fetchJson } from '../lib/api';

export async function fetchCartItems(token) {
  const response = await fetchJson('/api/cart-items', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response;
}