import React from 'react';
import { Alert, Fab, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';

export default function AddButton() {
  const router = useRouter();
  const [user, loading, err] = useAuthState(auth);

  function handleAdd() {
    if (!user && !loading) {
      router.push('/signin');
    } else {
      router.push('/add');
    }
  }

  if (err) return <Alert severity="error">{err.message}</Alert>;

  return (
    <Tooltip title='Add game'>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 5,
        }}
        id="addButton"
        onClick={handleAdd}
      >
        <Add />
      </Fab>
    </Tooltip>
  );
}
