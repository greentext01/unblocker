import React from 'react';
import AuthButtons from '../auth/AuthButtons';
import { Box } from '@mui/material';

export default function GameHeader() {
  return (
    <>
      <Box display="flex" sx={{
        justifyContent: 'center'
      }}>
        <h1 style={{
        }}>
          Games (With Shrimp 🦐)
        </h1>
      </Box>
      <Box display="flex" sx={{
        justifyContent: 'center',
        mb: '40px'
      }}>
        <AuthButtons />
      </Box>
    </>
  );
}
