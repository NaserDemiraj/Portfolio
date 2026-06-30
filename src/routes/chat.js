import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Groq from 'groq-sdk';
import { asyncHandler, httpError } from '../middleware/errorHandler.js';
import { SYSTEM_PROMPT } from '../lib/persona.js';

const router = Router();

const { GROQ_API_KEY } = process.env;
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const groq = GROQ_API_KEY ? new Groq({ apiKey: GROQ_API_KEY }) : null;

// Throttle public chat usage: 20 messages / 5 min per IP.
const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please slow down and try again shortly.' },
});

// POST /api/chat  — public
// Body: { message: "..." }  OR  { messages: [{ role, content }, ...] }
// The persona + knowledge base live in SYSTEM_PROMPT (src/lib/persona.js),
// so the frontend only sends the user's message(s).
router.post(
  '/',
  chatLimiter,
  asyncHandler(async (req, res) => {
    if (!groq) throw httpError(500, 'Server misconfigured: GROQ_API_KEY not set.');

    const b = req.body || {};

    // Normalize input into a {role, content}[] list (OpenAI-style roles).
    let turns;
    if (Array.isArray(b.messages)) {
      turns = b.messages
        .filter((m) => m && typeof m.content === 'string' && ['user', 'assistant'].includes(m.role))
        .slice(-12); // keep recent context only
    } else if (typeof b.message === 'string') {
      turns = [{ role: 'user', content: b.message }];
    } else {
      throw httpError(400, 'Provide a "message" string or a "messages" array.');
    }

    if (turns.length === 0) throw httpError(400, 'No valid message to send.');
    const last = turns[turns.length - 1];
    if (last.role !== 'user') throw httpError(400, 'The last message must be from the user.');
    if (last.content.length > 2000) throw httpError(400, 'Message is too long (max 2000 chars).');

    let reply = '';
    try {
      const completion = await groq.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...turns],
        temperature: 0.6,
        max_tokens: 512,
      });
      reply = completion.choices?.[0]?.message?.content?.trim() || '';
    } catch (err) {
      console.error('[chat] Groq error', err?.status || '', err?.message || err);
      throw httpError(503, 'Chat is temporarily unavailable. Please try again later.');
    }

    res.json({ reply });
  })
);

export default router;
