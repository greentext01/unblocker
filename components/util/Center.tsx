import { Box } from '@mui/system';
import React, { ReactNode } from 'react';

export function Center({ children }: { children?: ReactNode }) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}
