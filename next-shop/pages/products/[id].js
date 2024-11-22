// pages/products/[id].js

import Head from 'next/head';
import Image from 'next/image';
import Title from '../../components/Title';
import { ApiError } from '../../lib/api';
import { getProduct, getProducts } from '../../lib/products';

function ProductPage({ product }) {
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