import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

function GoogleButton(props) {
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
            <img src="google.svg" />
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
