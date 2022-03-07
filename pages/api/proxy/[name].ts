import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'GET')
    return res.status(405).json({ error: 'Only GET allowed' });

  const { name } = req.query;

  const proxy = await prisma.proxy.findUnique({
    where: {
      name: name as string,
    },
  });

  if (!proxy) return res.status(404).json({ error: 'Proxy not found' });

  res.status(200).json({ proxy: proxy?.url });
};

export default handler;
