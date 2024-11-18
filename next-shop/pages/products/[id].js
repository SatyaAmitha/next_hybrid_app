// pages/products/[id].js

import { getProduct, getAllProductIds } from '../../lib/products';
import Head from 'next/head';

export async function getStaticPaths() {
  const paths = await getAllProductIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getProduct(params.id);
  return {
    props: {
      product,
    },
  };
}

function ProductPage({ product }) {
  return (
    <>
      <Head>
        <title>{product.title} - Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p>{product.description}</p>
      </main>
    </>
  );
}

export default ProductPage;