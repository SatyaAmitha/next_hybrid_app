// File: components/ProductPage.js

import React from 'react';
import { addCartItem } from '../api/cart';

function ProductPage({ product, token }) {
  const handleAddToCart = async () => {
    try {
      await addCartItem(token, product.id, 1);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductPage;