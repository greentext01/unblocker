import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import AuthButtons from '../components/auth/AuthButtons';
import useUser from '../lib/useUser';

export default function SignIn() {
  const router = useRouter();
  const { user } = useUser();

  if (user) router.push('/');

  return (
    <Box sx={{ margin: '10vmin' }}>
      {/*<h1>You are not signed in!</h1>
      <AuthButtons
        onChange={(token) => {
          if (token) router.push('/');
        }}
      />*/}
      <h1>Disabled for now until I find a fix for signing in on iPads</h1>
    </Box>
  );
}
