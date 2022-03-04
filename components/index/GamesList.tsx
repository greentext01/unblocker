import React, { Fragment, useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from '@mui/material';
import Game from './GameCard';
import useUser from '../../lib/useUser';
import { get } from '../../lib/superfetch';

export default function GamesList() {
  const { user, token } = useUser();
  const [categ, setCateg] = useState('Any');

  const [games, setGames] = useState<GameType[]>([]);

  useEffect(() => {
    const getGames = async () => {
      const data = await get(`/api/game/${categ}`, { token });
      setGames(data.games);
    };

    getGames();
  }, [user, categ, token]);

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

  if (!games)
    return (
      <>
        <SelectCateg />
        <LinearProgress sx={{ m: 2 }} />
      </>
    );

  return (
    <>
      <SelectCateg />
      <Box sx={{ m: 2 }}>
        <Grid container spacing={2}>
          {games.map((game, index) => (
            <Fragment key={index}>
              <Game game={game} token={token} />
            </Fragment>
          ))}
        </Grid>
      </Box>
    </>
  );
}
