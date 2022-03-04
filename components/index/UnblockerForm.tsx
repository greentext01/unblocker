import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import UnblockerButtons from './UnblockerButtons';
import launchUnblocker from '../../lib/launchUnblocker';

function UnblockerForm() {
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  function onSubmit(selectedIndex: number) {
    if (!url) return setError('Please input a url');
    launchUnblocker(selectedIndex == 0 ? 'womginx' : 'corrosion', url);
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
        <UnblockerButtons handleClick={onSubmit} />
      </Grid>
    </Grid>
  );
}

export default UnblockerForm;
