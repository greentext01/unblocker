import React from 'react';
import { Container, LinearProgress, Paper } from '@mui/material';
import { Box } from '@mui/system';

const GameBox = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        py: '50px',
      }}
    >
      <Container>
        <Paper>
          <LinearProgress />
        </Paper>
      </Container>
    </Box>
  );
};

export default GameBox;
