// File: components/ProductPage.js

import { useUser } from '../hooks/user';

function ProductPage() {
  const user = useUser();

  return (
    <div>
      <h1>Product Name</h1>
      <p>Price: $100</p>
      {user && <p>Only for {user.name}!</p>}
    </div>
  );
}

export default ProductPage;