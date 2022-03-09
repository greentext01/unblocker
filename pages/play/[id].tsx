import { LinearProgress } from '@mui/material';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Game from '../../components/play/Game';

type Props = {
  game: GameDetails;
  runs: Run[];
};

const Play = () => {
  const [data, setData] = useState();
  const [error, setError] = useState<null | number>(null);
  const router = useRouter();

  useEffect(() => {
    const getGame = async () => {
      const res = await fetch(`/api/game/details/${router.query.id}`);

      if(!res.ok)
        return setError(res.status);
      
      setData(await res.json());
    };

    getGame();
  }, [router.query.id]);

  if (data) {
    return <Game {...data} />;
  } else if (error) {
    return <Error statusCode={error} />;
  } else {
    return <LinearProgress />;
  }
};

export default Play;
