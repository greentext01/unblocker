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
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';

type Run = {
  time: Date;
  runner: string;
};

type Props = {
  id: string;
  name: string;
  category: string;
  runs: Array<Run>;
  admin: boolean;
  approved: string;
};

export default function Game(props: Props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card
        sx={{
          opacity: props.approved ? 1 : 0.15,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="caption">Category: {props.category}</Typography>
        </CardContent>
        <CardActions>
          <Link href={`/play/${props.id}`} passHref>
            <Button size="small">Play</Button>
          </Link>
          {!props.approved && props.admin && (
            <Button
              size="small"
              onClick={() => {
                setDoc(
                  doc(db, 'games', props.id),
                  { approved: true },
                  { merge: true }
                );
              }}
            >
              Approve
            </Button>
          )}
          {props.approved && props.admin && (
            <Button
              size="small"
              onClick={() => {
                setDoc(
                  doc(db, 'games', props.id),
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
