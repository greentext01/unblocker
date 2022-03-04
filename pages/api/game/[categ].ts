import { NextApiRequest, NextApiResponse } from 'next';
import getUser from '../../../lib/getUser';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'GET')
    return res.status(405).json({ error: 'Only GET allowed' });

  const { categ } = req.query;
  const user = getUser(req);

  const games = await prisma.game.findMany({
    where: {
      approved: user?.admin ? undefined : true,
      category: categ && categ != 'Any' ? (categ as string) : undefined,
    },
    select: {
      credit: {
        select: {
          name: true,
        },
      },
      approved: true,
      category: true,
      id: true,
      name: true,
    },
  });

  res.status(200).json({ games });
};

export default handler;
