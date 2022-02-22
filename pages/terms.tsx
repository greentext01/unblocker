import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';

export default function Terms() {
  return (
    <Box sx={{ margin: '10vmin' }}>
      <Typography variant="h4">Terms and Conditions</Typography>
      <ul>
        <li>
          DON&apos;T USE THIS IN CLASS. This website only meant for étude if the
          teacher/surveillant allows iPads.
        </li>
        <li>
          I could blacklist a website if I feel like it (But I probably
          won&apos;t).
        </li>
        <li>No weebs allowed.</li>
        <li>The lunch rule is literally 1984.</li>
        <li>Nour is a snake.</li>
      </ul>
      <Link href="/">Back home</Link>
    </Box>
  );
}
