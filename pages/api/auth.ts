import { OAuth2Client } from 'google-auth-library';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ error: 'Please set an idToken' });

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload)
    return res.status(400).json({ error: 'Please set a valid idToken' });

  let user = await prisma.user.findUnique({
    where: {
      id: payload.sub,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: payload.given_name,
        id: payload.sub,
      },
    });
  }

  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    noTimestamp: true,
  });

  res.json({ token: token });
};

export default handler;
