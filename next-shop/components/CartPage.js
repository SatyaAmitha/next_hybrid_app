// File: components/CartPage.js

import React, { useEffect, useState } from 'react';
import { fetchCartItems } from '../api/cart';

function CartPage({ token }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await fetchCartItems(token);
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    loadCartItems();
  }, [token]);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;