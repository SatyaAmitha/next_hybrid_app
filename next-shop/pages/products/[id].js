// pages/products/[id].js

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Title from '../../components/Title';
import { ApiError } from '../../lib/api';
import { getProduct, getProducts } from '../../lib/products';

function ProductPage({ product }) {
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/cart-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.ok) {
        setMessage('Product added to cart!');
      } else {
        setMessage('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <div className="flex flex-col lg:flex-row">
          <div>
            <Image src={product.pictureUrl} alt="" width={640} height={480} priority />
          </div>
          <div className="flex-1 lg:ml-4">
            <p className="text-sm">
              {product.description}
            </p>
            <p className="text-lg font-bold mt-2">
              {product.price}
            </p>
            <button onClick={handleAddToCart} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const products = await getProducts();
  const paths = products.map(product => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const product = await getProduct(params.id);
    return { props: { product } };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

export default ProductPage;