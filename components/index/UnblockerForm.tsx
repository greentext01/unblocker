import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function UnblockerForm() {
  const [url, setUrl] = useState('');

  function onSubmit() {
    const lowerURL = url.toLowerCase();
    if (lowerURL.startsWith('http://') || lowerURL.startsWith('https://')) {
      window.location.replace(`/proxy/${url}`);
    } else {
      const proto = window.location.protocol;
      const host = window.location.host;
      window.location.replace(`${proto}//${host}/proxy/http://${url}`);
    }
  }

  return (
    <>
      <TextField
        label="Paste URL here"
        variant="outlined"
        value={url}
        sx={{
          width: '60%',
          height: '56px',
        }}
        onChange={(event) => setUrl(event.target.value)}
      />
      <Button
        variant="contained"
        style={{
          marginLeft: '5px',
          height: '56px',
          width: '75px',
        }}
        onClick={() => onSubmit()}
      >
        Go!
      </Button>
    </>
  );
}

export default UnblockerForm;
