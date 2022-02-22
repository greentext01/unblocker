import React from 'react';
import 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function AuthButtons() {
  const [user, loading] = useAuthState(auth);

  if (user && !loading) return <LogoutButton />;
  else if (!loading) return <LoginButton />;
  else return <></>;
}
