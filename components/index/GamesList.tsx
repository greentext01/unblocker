import React, { Fragment, useEffect, useState } from 'react';
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../firebase';
import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from '@mui/material';
import Game from './GameCard';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function GamesList() {
  const gameRef = collection(db, 'games');
  const adminRef = collection(db, 'admins');

  const [categ, setCateg] = useState('');
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);

  /* 
  Can't conditionally call useCollection 
  so I need to use state + useEffect + getDocs
  */
  useEffect(() => {
    async function getAdmin() {
      if (user) {
        const adminQ = query(adminRef, where(documentId(), '==', user.uid));
        setAdmin(!(await getDocs(adminQ)).empty);
      } else {
        setAdmin(false);
      }
    }

    getAdmin();
  }, [adminRef, user]);

  let q = undefined;
  if (categ && categ != 'Any') {
    q = query(gameRef, where('category', '==', categ));
  } else {
    q = gameRef;
  }

  const [games, loadingGames, error] = useCollection(q);

  function SelectCateg() {
    return (
      <Box
        sx={{
          width: 200,
          ml: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="categ-label">Category</InputLabel>
          <Select
            labelId="categ-label"
            value={categ}
            label="Category"
            onChange={(e) => setCateg(e.target.value)}
          >
            <MenuItem value="Any">Any</MenuItem>
            <MenuItem value="Site">Site</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
            <MenuItem value="Puzzle">Puzzle</MenuItem>
            <MenuItem value="Skill">Skill</MenuItem>
            <MenuItem value="Level">Level</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

  if (loadingGames)
    return (
      <>
        <SelectCateg />
        <LinearProgress sx={{ m: 2 }} />
      </>
    );
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;
  return (
    <>
      <SelectCateg />
      <Box sx={{ m: 2 }}>
        <Grid container spacing={2}>
          {games?.docs.map((game, index) => (
            <Fragment key={index}>
              {!admin && game.data().approved && (
                <Game {...game.data() as any} id={game.id} />
              )}
              {admin && <Game {...game.data() as any} id={game.id} />}
            </Fragment>
          ))}
        </Grid>
      </Box>
    </>
  );
}
