import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  for (const game of await prisma.game.findMany()) {
    const newUrl = game.url.replace(
      'https://ec2-3-135-145-173.us-east-2.compute.amazonaws.com/main/',
      'http://3.135.145.173:8000/main/'
    );

    await prisma.game.update({
      where: {
        id: game.id,
      },
      data: {
        url: newUrl,
      },
    });

    console.log(game.url);
  }
};

export default handler;
