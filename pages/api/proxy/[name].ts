import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'GET')
    return res.status(405).json({ error: 'Only GET allowed' });

  const { name } = req.query;

  if (!name) return res.status(400).json({ error: 'Please input a name' });

  const proxies = await prisma.proxy.findUnique({
    where: {
      name: name as string,
    },
  });

  res.status(200).json({ proxies: proxies });
};

export default handler;
