import { NextApiRequest, NextApiResponse } from 'next';
import getUser from '../../../lib/getUser';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST')
    return res.status(405).json({ error: 'Only POST allowed' });

  try {
    const user = getUser(req);

    if (user) {
      const { category, name, url } = req.body;

      if (!(category && name && url))
        return res.status(400).json({ error: 'Please include all the fields' });

      if (!['Site', 'Other', 'Puzzle', 'Skill', 'Level'].includes(category)) {
        return res.status(400).json({ error: 'Please add a valid category' });
      }

      await prisma.game.create({
        data: {
          category,
          name,
          url,
          credit: {
            connect: {
              id: user.id,
            },
          },
          approved: false,
        },
      });

      res.status(200).json({});
    } else {
      res.status(403).json({ error: 'You must be logged in' });
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export default handler;
