import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { supabase } from '../lib/supabase.js';
import { requireApiKey } from '../middleware/auth.js';
import { asyncHandler, httpError } from '../middleware/errorHandler.js';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Throttle public submissions: max 5 per 10 min per IP.
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again later.' },
});

// POST /api/contact  — submit a message (public)
router.post(
  '/',
  contactLimiter,
  asyncHandler(async (req, res) => {
    const b = req.body || {};

    // Honeypot: bots fill hidden fields. Silently accept & drop.
    if (b.website || b.honeypot) return res.status(201).json({ ok: true });

    const name = String(b.name || '').trim();
    const email = String(b.email || '').trim();
    const message = String(b.message || '').trim();
    const subject = b.subject ? String(b.subject).trim().slice(0, 200) : null;

    if (!name || !email || !message) throw httpError(400, 'name, email, and message are required');
    if (name.length > 100) throw httpError(400, 'name is too long');
    if (!EMAIL_RE.test(email)) throw httpError(400, 'Invalid email address');
    if (message.length > 5000) throw httpError(400, 'message is too long (max 5000 chars)');

    const ip =
      (req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '').trim() ||
      null;

    const { error } = await supabase.from('contact_messages').insert({
      name,
      email,
      subject,
      message,
      ip_address: ip,
    });

    if (error) throw httpError(500, error.message);
    res.status(201).json({ ok: true, message: 'Thanks! Your message has been sent.' });
  })
);

// --- Admin endpoints — require x-api-key ---

// GET /api/contact  — list messages (admin)
router.get(
  '/',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
    const offset = parseInt(req.query.offset, 10) || 0;

    let query = supabase
      .from('contact_messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.unread === 'true') query = query.eq('read', false);

    const { data, error, count } = await query;
    if (error) throw httpError(500, error.message);
    res.json({ messages: data, total: count, limit, offset });
  })
);

// PATCH /api/contact/:id  — mark read/unread (admin)
router.patch(
  '/:id',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ read: Boolean(req.body?.read) })
      .eq('id', req.params.id)
      .select()
      .maybeSingle();

    if (error) throw httpError(500, error.message);
    if (!data) throw httpError(404, 'Message not found');
    res.json(data);
  })
);

// DELETE /api/contact/:id  (admin)
router.delete(
  '/:id',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const { error, count } = await supabase
      .from('contact_messages')
      .delete({ count: 'exact' })
      .eq('id', req.params.id);

    if (error) throw httpError(500, error.message);
    if (!count) throw httpError(404, 'Message not found');
    res.status(204).end();
  })
);

export default router;
