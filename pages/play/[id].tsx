import { GetServerSideProps } from 'next';
import React from 'react';
import Game from '../../components/play/Game';
import prisma from '../../lib/prisma';

type Props = {
  game: GameDetails;
  runs: Run[];
};

const Play = (props: Props) => {
  return <Game {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context.params?.id as string);
  if (!id) return { notFound: true };

  const game = await prisma.game.findUnique({
    where: {
      id,
    },
    include: {
      credit: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!game) return { notFound: true };

  const runs = await prisma.run.findMany({
    where: {
      gameId: game.id,
    },
    include: {
      runner: {
        select: {
          name: true,
        },
      },
    },
  });

  return { props: { game, runs } };
};

export default Play;
