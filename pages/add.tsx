import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '../lib/useUser';
import { post } from '../lib/superfetch';
import { Center } from '../components/util/Center';
import { Box } from '@mui/system';
import Link from 'next/link';

export const urlre =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export default function AddGame() {
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [category, setCateg] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [sent, setSent] = useState(false);

  const router = useRouter();

  const { user, loading, token } = useUser();

  if (!user && !loading) router.push('/signin');

  function sendGame() {
    if (!name) {
      setErr('Please select a name');
      return;
    } else if (!category) {
      setErr('Please select a category');
      return;
    } else if (!url || !urlre.test(url)) {
      setErr('Please select a valid url');
      return;
    }

    post(
      '/api/game',
      {
        approved: false,
        category,
        name,
        url,
        runs: [],
      },
      {
        token,
      }
    ).then(() => setSent(true));
  }

  return (
    <Center>
      <Paper
        sx={{
          p: {
            xs: 2,
            sm: 10,
          },
          width: 'min(90vw, 900px)',
          m: {
            xs: 1,
            sm: 10,
          },
        }}
      >
        {!sent && (
          <>
            {err && <Alert severity="error">{err}</Alert>}
            <h1>Add game</h1>
            <Stack spacing={3}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(e) => setCateg(e.target.value)}
                >
                  <MenuItem value="Site">Site</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                  <MenuItem value="Puzzle">Puzzle</MenuItem>
                  <MenuItem value="Skill">Skill</MenuItem>
                  <MenuItem value="Level">Level</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Url"
                variant="outlined"
                value={url}
                fullWidth
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{
                  width: '100px',
                }}
                onClick={sendGame}
              >
                Submit
              </Button>
            </Stack>
          </>
        )}

        {sent && (
          <>
            <Box>
              Submitted! Please wait for the game to get approved by the admins.
            </Box>
            <Link href="/">Back home</Link>
          </>
        )}
      </Paper>
    </Center>
  );
}
