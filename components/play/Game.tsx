import React, { useState } from 'react';
import { Button, Container, Grid, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import launchUnblocker from '../../lib/launchUnblocker';
import RunTable from './RunTable';
import Link from 'next/link';

type Props = {
  game: GameDetails;
  runs: Run[];
};

const GameBox = (props: Props) => {
  const [easterEgg, setEasterEgg] = useState<boolean>(false);

  return (
    <Container>
      <h1 style={{ textAlign: 'center', fontSize: 'min(8vw, 30px)' }}>
        {props.game.name}
      </h1>
      <h5 style={{ textAlign: 'center', fontSize: 'min(4vw, 14px)' }}>
        Submitted by {props.game.credit.name}
      </h5>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button variant="contained" onClick={() => window.open(props.game.url)} size="large">
          Play
        </Button>
      </Box>

      <Box sx={{ mt: 15 }}>
        <Grid
          container
          sx={{
            mb: 2,
          }}
        >
          <Grid item xs={4} />
          <Grid item xs={4}>
            <h1 style={{ textAlign: 'center', margin: 0 }}>Runs</h1>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            <Link href={`/speedrun/${props.game.id}`} passHref>
              <Button variant="contained">Submit run</Button>
            </Link>
          </Grid>
        </Grid>
        {props.runs.length > 0 && <RunTable runs={props.runs} />}
        {!props.runs.length && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            {!easterEgg && (
              <Image
                src="/absolutely-no-runs.png"
                alt="No runs?"
                width={300}
                height={300}
                onClick={() => setEasterEgg(true)}
              />
            )}
            {easterEgg && (
              <h1 onClick={() => setEasterEgg(false)}>You found the 🦐!</h1>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default GameBox;
