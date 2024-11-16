// pages/index.js
import Head from 'next/head';
import Title from '../components/Title';

function HomePage() {
  return (
    <>
      <Head>
        <title>Next</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <h4 className="text-black text-xl font-medium">Welcome</h4>
        <p>
          [TODO: display products]
        </p>
      </main>
    </>
  );
}

export default HomePage;