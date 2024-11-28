// pages/_app.js

import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    // Provide the QueryClient to the entire application
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;