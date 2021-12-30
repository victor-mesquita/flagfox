import { supabase } from '@/lib/supabase-client';
import { NextApiResponse } from 'next';

export default function authorized() {
  return async (req: any, res: NextApiResponse, next: any) => {
    const token = req.cookies['sb:token'];

    try {
      const { data: user, error } = await supabase.auth.api.getUser(token);

      if (error) return res.status(401).json({ error: error.message });

      req.user = user;
      next();
    } catch (e) {
      res.status(400).json({ error: e });
    }
  };
}
