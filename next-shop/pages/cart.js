// File: pages/cart.js

import { useQuery } from 'react-query';
import Page from '../components/Page';
import { fetchJson } from '../lib/api';

function CartPage() {
  // Use React Query's useQuery hook to fetch cart items
  const query = useQuery('cartItems', () => fetchJson('/api/cart'));
  const cartItems = query.data;

  // Log the cart items data to the console for verification
  console.log('[CartPage] cartItems:', cartItems);

  return (
    <Page title="Cart">
      {/* Additional UI components to display cart items will be added here */}
    </Page>
  );
}

export default CartPage;