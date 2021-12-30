import { supabase } from '@/lib/supabase-client';

import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.token as string;

  const { data: user, error } = await supabase.auth.api.getUser(token);

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(user);
});

export default apiRoute;
