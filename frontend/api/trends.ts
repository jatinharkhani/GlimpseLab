import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiRes = await fetch('http://localhost:3001/trends'); // NestJS backend
  const data = await apiRes.json();
  res.status(200).json(data);
}

