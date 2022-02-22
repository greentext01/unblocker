import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import GoogleButton from './GoogleButton';

function LoginButton() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return <GoogleButton signin onClick={() => signInWithGoogle()} />;
}

export default LoginButton;
