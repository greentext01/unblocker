import { Paper, Box } from '@mui/material';
import UnblockerForm from './UnblockerForm';
import React from 'react';
import Link from 'next/link';
import RespHeader from '../util/RespHeader';

function UnblockerHead() {
  return (
    <>
      <Paper style={{ margin: '5px' }}>
        <RespHeader
          style={{
            textAlign: 'center',
            paddingTop: '50px',
            marginTop: '0px',
          }}
        >
          Node unblocker mk2
        </RespHeader>
        <p
          style={{
            textAlign: 'center',
            margin: '0px',
            fontSize: 'min(4vw, 16px)',
          }}
        >
          By using the proxy, you agree to the{' '}
          <Link href="/terms">Terms and conditions</Link>
        </p>
        <p
          style={{
            textAlign: 'center',
            margin: '0px',
            fontSize: 'min(4vw, 16px)',
          }}
        >
          Both of the unblockers are temporarily set to be the regular node
          unblocker instead of the fancy new unblockers because they aren&apos;t
          done yet.
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
