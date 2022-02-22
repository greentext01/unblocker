import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Play: NextComponentType = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Play</div>;
};

export default Play;
 