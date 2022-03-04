import { NextApiRequest, NextApiResponse } from 'next';
import getUser from '../../../../lib/getUser';
import prisma from '../../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'PATCH')
    return res.status(405).json({ error: 'Only PATCH allowed' });

  const user = getUser(req);

  if (!(user && user.admin))
    return res.status(403).json({ error: 'You must be admin' });

  const { id } = req.query;

  const body: {
    approved: boolean;
  } = req.body;

  const gameId = parseInt(id as string);

  if (!gameId) res.status(400).json({ error: 'Please input a valid id' });

  const game = await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      approved: body.approved,
    },
  });

  if (!game) return res.status(404).json({ error: 'Game not found' });

  res.status(200).json({});
};

export default handler;
