import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthButtons from '../components/auth/AuthButtons';
import { auth } from '../firebase';

export default function SignIn() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  return (
    <Box sx={{ margin: '10vmin' }}>
      <h1>You are not signed in!</h1>
      <AuthButtons />
    </Box>
  );
}
