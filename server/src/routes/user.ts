import { Router, Response } from 'express';
import { supabase } from '../db/supabase';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/home', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const { data: user } = await supabase
    .from('users')
    .select('name')
    .eq('id', userId)
    .single();

  if (!user) {
    res.status(404).json({ error: { message: 'User not found' } });
    return;
  }

  const now = new Date();
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - ((now.getUTCDay() + 6) % 7));
  monday.setUTCHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('workout_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', monday.toISOString());

  res.json({
    welcome: { name: user.name },
    goalProgress: {
      completed: count || 0,
      target: 5,
    },
  });
});

export default router;