import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useUser from '../../lib/useUser';

export default function AddButton() {
  const router = useRouter();
  const { user } = useUser();

  function handleAdd() {
    if (!user) router.push('/signin');
    else router.push('/add');
  }

  return (
    <Tooltip title="Add game">
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
