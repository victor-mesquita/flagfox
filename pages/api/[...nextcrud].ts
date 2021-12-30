import NextCrud, { HttpError, PrismaAdapter } from '@premieroctet/next-crud';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase-client';

const handler = NextCrud({
  adapter: new PrismaAdapter({
    prismaClient: prisma
  }),
  onRequest: async (req, _res, next) => {
    const token = req.cookies['sb:token'];

    try {
      const { error } = await supabase.auth.api.getUser(token);

      if (error) throw new HttpError(401, 'you cannot modify this user');
    } catch (e) {
      throw new HttpError(400, 'you cannot modify this user');
    }
  }
});

export default handler;
