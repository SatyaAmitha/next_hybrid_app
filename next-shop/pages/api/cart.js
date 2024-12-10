// File: pages/api/cart.js

import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

// Function to strip unnecessary fields from the cart item
function stripCartItem(cartItem) {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
    quantity: cartItem.quantity,
  };
}
async function handlePostCart(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { productId, quantity } = req.body;
  try {
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productId, quantity }),
    });
    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
}

async function handleCart(req, res) {
  const { jwt } = req.cookies; // Extract JWT from cookies
  if (!jwt) {
    res.status(401).end(); // Unauthorized if no JWT
    return;
  }
  try {
    // Fetch cart items from CMS
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { 'Authorization': `Bearer ${jwt}` },
    });
    // Strip unnecessary data and send response
    res.status(200).json(cartItems.map(stripCartItem));
  } catch (err) {
    res.status(401).end(); // Handle errors
  }
}

export default handleCart;