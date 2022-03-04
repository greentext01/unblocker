import { Button, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';

type Props = {
  uploaded: boolean;
  upload: number | undefined;
  submit: () => void;
};

export function SpeedrunUpload(props: Props) {
  if (props.uploaded) {
    return (
      <>
        <Box>
          Done! Please wait for the speedrun to get approved by the admins.
        </Box>
        <Link href="/">Back home</Link>
      </>
    );
  } else {
    if (props.upload == undefined) {
      return (
        <Button variant="contained" onClick={props.submit}>
          Submit
        </Button>
      );
    } else {
      return (
        <>
          <Typography
            sx={{
              mb: 1,
            }}
          >
            Uploading...
          </Typography>
          <LinearProgress variant="determinate" value={props.upload} />
        </>
      );
    }
  }
}
