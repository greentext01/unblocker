import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

export default function getUser(req: NextApiRequest) {
  const auth = req.headers.authorization;
  
  if (auth) {
    const token = auth.substring(7);
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as UserToken;
      } catch (err) {
        return null;
      }
    }
  }

  return null;
}
