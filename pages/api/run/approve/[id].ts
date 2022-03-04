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

  const runId = parseInt(id as string);

  if (!runId) res.status(400).json({ error: 'Please input a valid id' });

  const run = await prisma.run.update({
    where: {
      id: runId,
    },
    data: {
      approved: body.approved,
    },
  });

  if (!run) return res.status(404).json({ error: 'Run not found' });

  res.status(200).json({});
};

export default handler;
