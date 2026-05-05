import { Router, Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { supabase } from '../db/supabase';

const router = Router();

const SignInSchema = z.object({
  email: z.string().email(),
});

router.post('/email-signin', async (req: Request, res: Response) => {
  const parsed = SignInSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: { message: 'Invalid email' } });
    return;
  }

  const { email } = parsed.data;
  const name = email.split('@')[0];

  const { data: user, error } = await supabase
    .from('users')
    .upsert({ email, name }, { onConflict: 'email' })
    .select()
    .single();

  if (error || !user) {
    res.status(500).json({ error: { message: 'Database error' } });
    return;
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

export default router;