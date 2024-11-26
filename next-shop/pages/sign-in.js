import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';
import { fetchJson } from '../lib/api';

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ 
    loading: false, 
    error: null 
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, error: null });
    try {
      const response = await fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      setStatus({ loading: false, error: null });
      console.log('sign in:', response);
      router.push('/'); // Redirect to HomePage after successful sign-in
    } catch (err) {
      console.error('Login Error:', {
        message: err.message,
        status: err.status,
        data: err.data
      });
      setStatus({ 
        loading: false, 
        error: err.message || 'Authentication failed' 
      });
    }
  }

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        
        {/* Detailed error message if login fails */}
        {status.error && (
          <p className="text-red-700">
            {status.error}
          </p>
        )}
        
        {/* Loading state */}
        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">
            Sign In
          </Button>
        )}
      </form>
    </Page>
  );
}

export default SignInPage;