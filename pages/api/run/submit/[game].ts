import { NextApiRequest, NextApiResponse } from 'next';
import getUser from '../../../../lib/getUser';
import prisma from '../../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST')
    return res.status(405).json({ error: 'Only POST allowed' });

  try {
    const user = getUser(req);
    if (!user) return res.status(403).json({ error: 'You must be signed in' });

    const { video, time } = req.body;
    if (!video) return res.status(400).json({ error: 'Please add a video' });

    const { game: gameId } = req.query;

    const parsedTime = parseInt(time);

    if(!parsedTime || parsedTime <= 0)
      return res.status(400).json({ error: 'Please set a valid time' });

    if (!parseInt(gameId as string))
      return res.status(400).json({ error: 'Invalid id' });

    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(gameId as string),
      },
    });

    if (!game) return res.status(404).json({ error: 'Game not found' });
    if (!game.approved && !user.admin)
      return res.status(403).json({ error: 'You have to be an admin' });

    await prisma.run.create({
      data: {
        videoUrl: video,
        time,
        runner: {
          connect: {
            id: user.id,
          },
        },
        game: {
          connect: {
            id: game.id,
          },
        },
      },
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }

  return res.json({});
};

export default handler;
