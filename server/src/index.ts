import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import workoutRouter from './routes/workout';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/workout', workoutRouter);
app.get('/health', (req, res) => res.json({ ok: true }));

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: { message: err.message || 'Server error' } });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});