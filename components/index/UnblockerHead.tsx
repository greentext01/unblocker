import { Paper, Box } from '@mui/material';
import UnblockerForm from './UnblockerForm';
import React from 'react';
import Link from 'next/link';

function UnblockerHead() {
  return (
    <>
      <Paper style={{ margin: '5px' }}>
        <h1
          style={{
            textAlign: 'center',
            paddingTop: '50px',
            marginTop: '0px',
          }}
        >
          Node unblocker mk2
        </h1>
        <p
          style={{
            textAlign: 'center',
            margin: '0px',
          }}
        >
          By using the proxy, you agree to the{' '}
          <Link href="/terms">Terms and conditions</Link>
        </p>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '170px',
          }}
        >
          <UnblockerForm />
        </Box>
      </Paper>
    </>
  );
}

export default UnblockerHead;

