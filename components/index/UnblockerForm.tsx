import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import launchUnblocker from '../../lib/launchUnblocker';

function UnblockerForm() {
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  function onSubmit() {
    if (!url) return setError('Please input a url');
    launchUnblocker('womginx', url);
  }

  return (
    <Grid container width="70%" spacing={0.5}>
      <Grid item xs={12} md={true}>
        <TextField
          label="Paste URL here"
          variant="outlined"
          value={url}
          sx={{
            height: '56px',
          }}
          onChange={(event) => {
            setUrl(event.target.value);
            setError('');
          }}
          fullWidth
          error={!!error}
          helperText={error}
        />
      </Grid>
      <Grid item xs={12} md="auto">
        <Button
          onClick={onSubmit}
          sx={{ width: '100%', height: '56px', px: 5}}
          variant="contained"
        >
          Play
        </Button>
      </Grid>
    </Grid>
  );
}

export default UnblockerForm;
