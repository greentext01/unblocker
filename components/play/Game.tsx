import React from 'react';
import { Button, Container, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, DocumentReference } from 'firebase/firestore';
import { db } from '../../firebase';
import LoadingGame from './LoadingGame';
import Game from '../../types/game';
import Error from 'next/error';
import RunTable from './RunTable';

type Props = {
  id: string;
};

const GameBox = (props: Props) => {
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
        display: 'grid',
        placeItems: 'center',
        py: '30px',
      }}
    >
      <Container>
        <Paper sx={{ p: 3 }}>
          <h1 style={{ textAlign: 'center' }}>{gameData.name}</h1>
          <Box>
            <Stack direction="row" spacing={1}>
              <Button variant='contained'>Play on Womginx</Button>
              <Button variant='contained'>Play on Corrosion</Button>
              <Button variant='contained'>Submit run</Button>
            </Stack>
          </Box>

          <Box sx={{ mt: 10 }}>
            <h1 style={{ textAlign: 'center' }}>Runs</h1>
            <RunTable runs={gameData.runs} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default GameBox;
