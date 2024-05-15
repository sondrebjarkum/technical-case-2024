import { UserActivity } from '@/types/models/user-activity';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserActivity[]>
) {
  const activitiesRes = await fetch('http://localhost:8000/user-activities/');
  res.status(200).json(await activitiesRes.json());
}
