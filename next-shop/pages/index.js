// pages/index.js

import Head from 'next/head';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import Title from '../components/Title';
import { getProducts } from '../lib/products';

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), // revalidate every 5 minutes
  };
}

function HomePage({ products }) {
  console.log('[HomePage] render:', products);
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default HomePage;