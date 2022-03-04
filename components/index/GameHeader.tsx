import React from 'react';
import AuthButtons from '../auth/AuthButtons';
import { Box } from '@mui/material';
import RespHeader from '../util/RespHeader';

export default function GameHeader() {
  return (
    <>
      <Box
        display="flex"
        sx={{
          justifyContent: 'center',
        }}
      >
        <RespHeader>
          Games (With Shrimp 🦐)
        </RespHeader>
      </Box>
      <Box
        display="flex"
        sx={{
          justifyContent: 'center',
          mb: '40px',
        }}
      >
        <AuthButtons />
      </Box>
    </>
  );
}
