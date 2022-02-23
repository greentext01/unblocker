import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import Game from '../../components/play/Game';
import LoadingGame from '../../components/play/LoadingGame';
import { db } from '../../firebase';
import { doc } from 'firebase/firestore';

const Play = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <LoadingGame />;

  return <Game id={id as string} />;
};

export default Play;
