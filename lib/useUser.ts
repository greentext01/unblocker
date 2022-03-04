import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState<UserToken | null>(null);
  const [tokenState, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUser(token ? jwtDecode<UserToken>(token) : null);
    setLoading(false);
    setToken(token);
  }, []);

  function changeUser(token: string | null) {
    setUser(token ? jwtDecode<UserToken>(token) : null);
    setToken(token);

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  return {
    user,
    loading,
    changeUser,
    token: tokenState as string | undefined,
  };
}
