// File: pages/sign-in.js

import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import { useSignIn } from '../hooks/user';

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Email">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>
      <Field label="Password">
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Field>
      {signInError && (
        <p className="text-red-700">Invalid credentials</p>
      )}
      {signInLoading ? (
        <p>Loading...</p>
      ) : (
        <Button type="submit">Sign In</Button>
      )}
    </form>
  );
}

export default SignInPage;