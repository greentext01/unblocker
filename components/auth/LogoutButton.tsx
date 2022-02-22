import React from 'react';
import { signOut } from 'firebase/auth';
import GoogleButton from './GoogleButton';
import { auth } from '../../firebase';

function LogoutButton() {
  return <GoogleButton signin={false} onClick={() => signOut(auth)} />;
}

export default LogoutButton;
