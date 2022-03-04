import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import useUser from '../../lib/useUser';

export default function AuthButtons(props: {
  onChange?: (token: string | null) => void;
}) {
  const { user, loading, changeUser } = useUser();

  function handleChange(token: string | null) {
    changeUser(token);
    props.onChange?.(token);
  }

  if (user) return <LogoutButton onLogout={() => handleChange(null)} />;
  else if (!user && !loading)
    return <LoginButton onLogin={(token) => handleChange(token)} />;
  else return <></>;
}
