import express from 'express';
import cors from 'cors';

import projectsRouter from './routes/projects.js';
import blogRouter from './routes/blog.js';
import contactRouter from './routes/contact.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Trust proxy (Vercel/Render sit behind one) so rate-limit & IP detection work.
app.set('trust proxy', 1);

// --- CORS ---
const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Allow non-browser requests (curl, server-to-server) with no Origin.
      if (!origin) return cb(null, true);
      if (allowed.includes('*') || allowed.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin not allowed by CORS: ${origin}`));
    },
  })
);

app.use(express.json({ limit: '1mb' }));

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// --- Routes ---
app.use('/api/projects', projectsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/contact', contactRouter);

// --- 404 + error handling ---
app.use(notFound);
app.use(errorHandler);

export default app;
