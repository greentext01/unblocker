import { NextApiResponse, NextApiRequest } from 'next';
import prisma from '../../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

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

  if (!game) return res.status(404).json({ error: 'Game not found' });

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

  return res.json({ game, runs });
};

export default handler;
