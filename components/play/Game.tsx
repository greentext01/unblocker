import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, DocumentReference } from 'firebase/firestore';
import { db } from '../../firebase';
import LoadingGame from './LoadingGame';
import Game from '../../types/game';
import Error from 'next/error';
import RunTable from './RunTable';
import Image from 'next/image';
import launchUnblocker from '../../util/launchUnblocker';

type Props = {
  id: string;
};

const GameBox = (props: Props) => {
  const [easterEgg, setEasterEgg] = useState<boolean>(false);
  const [game, gameLoading] = useDocument<Game>(
    doc(db, 'games', props.id) as DocumentReference<Game>
  );

  if (gameLoading) {
    return <LoadingGame />;
  }

  if (!game?.exists()) {
    return <Error statusCode={404} />;
  }

  const gameData = game.data() as Game;

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: '30px',
      }}
    >
      <Container>
        <Paper sx={{ p: 3 }}>
          <h1 style={{ textAlign: 'center' }}>{gameData.name}</h1>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack direction="row" spacing={0.5}>
              <Button
                variant="contained"
                onClick={() => launchUnblocker('womginx', gameData.url)}
              >
                Play on Womginx
              </Button>
              <Button
                variant="contained"
                onClick={() => launchUnblocker('corrosion', gameData.url)}
              >
                Play on Corrosion
              </Button>
            </Stack>
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
                <Button variant="contained">Submit run</Button>
              </Grid>
            </Grid>
            {gameData.runs.length > 0 && <RunTable runs={gameData.runs} />}
            {!gameData.runs.length && (
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
        </Paper>
      </Container>
    </Box>
  );
};

export default GameBox;
