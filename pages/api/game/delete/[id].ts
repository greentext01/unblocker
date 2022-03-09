import { NextApiRequest, NextApiResponse } from 'next';
import getUser from '../../../../lib/getUser';
import prisma from '../../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'DELETE')
    return res.status(405).json({ error: 'Only DELETE allowed' });

  const user = getUser(req);

  if (!(user && user.admin))
    return res.status(403).json({ error: 'You must be admin' });

  const { id } = req.query;

  const gameId = parseInt(id as string);

  if (!gameId) res.status(400).json({ error: 'Please input a valid id' });

  await prisma.game.delete({
    where: {
      id: gameId,
    },
  });

  res.status(200).json({});
};

export default handler;
