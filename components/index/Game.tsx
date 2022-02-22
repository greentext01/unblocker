import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Game({ game }: { game: any }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card
        sx={{
          opacity: game.approved ? 1 : 0.15,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.name}
          </Typography>
          <Typography variant="caption">Category: {game.category}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Play</Button>
          {!game.approved && (
            <Button
              size="small"
              onClick={() => {
                setDoc(
                  doc(db, 'games', game.id),
                  { approved: true },
                  { merge: true }
                );
              }}
            >
              Approve
            </Button>
          )}
          {game.approved && (
            <Button
              size="small"
              onClick={() => {
                setDoc(
                  doc(db, 'games', game.id),
                  { approved: false },
                  { merge: true }
                );
              }}
            >
              Disapprove
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
};
