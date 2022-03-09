import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { post } from '../../lib/superfetch';

type Props = {
  game: GameType;
  token: string | undefined;
};

export default function Game(props: Props) {
  const [approved, setApproved] = useState(props.game.approved);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Link href={`/play/${props.game.id}`} passHref>
        <Card
          sx={{
            opacity: approved ? 1 : 0.15,
          }}
        >
          <CardContent>
            <MuiLink
              gutterBottom
              variant="h5"
              component="div"
              color="inherit"
              underline="hover"
            >
              {props.game.name}
            </MuiLink>
            <Typography variant="caption" component="div">
              Category: {props.game.category}
            </Typography>
            <Typography variant="caption" component="div">
              By: {props.game.credit.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Play</Button>
            {!approved && (
              <Button
                size="small"
                onClick={() => {
                  setApproved(true);

                  post(
                    `/api/game/approve/${props.game.id}`,
                    {
                      approved: true,
                    },
                    {
                      token: props.token,
                      method: 'PATCH',
                    }
                  );
                }}
              >
                Approve
              </Button>
            )}
            {approved && (
              <Button
                size="small"
                onClick={() => {
                  setApproved(false);

                  post(
                    `/api/game/approve/${props.game.id}`,
                    {
                      approved: false,
                    },
                    {
                      token: props.token,
                      method: 'PATCH',
                    }
                  );
                }}
              >
                Disapprove
              </Button>
            )}
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
}
