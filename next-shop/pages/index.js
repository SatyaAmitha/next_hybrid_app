// pages/index.js

import Page from '../components/Page';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/products';
import Link from 'next/link';

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products } };
}

function HomePage({ products }) {
  return (
    <Page title="Indoor Plants">
      <div className="flex justify-end p-4">
        <Link href="/sign-in"
         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Sign In
        </Link>
      </div>
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}

export default HomePage;