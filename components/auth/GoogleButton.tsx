import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

const centerStyles = {
  display: 'grid',
  placeItems: 'center',
  height: '100%',
};

function GoogleButton(props: any) {
  return (
    <Paper
      sx={{
        width: '230px',
        height: '50px',
      }}
      // Whatever it works
      onClick={props.onClick}
    >
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={3}>
          <Box sx={centerStyles}>
            <Image alt="Google icon" src="/google.svg" width={25} height={25} />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box sx={centerStyles}>
            {props.signin ? 'Sign in with Google' : 'Sign out from Google'}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

GoogleButton.propTypes = {
  signin: PropTypes.bool,
  onClick: PropTypes.func,
};

export default GoogleButton;
