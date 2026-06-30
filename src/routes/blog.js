import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { requireApiKey } from '../middleware/auth.js';
import { asyncHandler, httpError } from '../middleware/errorHandler.js';

const router = Router();

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// GET /api/blog  — list published posts (public)
// Query: ?tag=foo  ?limit=10  ?offset=0
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const offset = parseInt(req.query.offset, 10) || 0;

    let query = supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image, tags, published_at', { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.tag) query = query.contains('tags', [req.query.tag]);

    const { data, error, count } = await query;
    if (error) throw httpError(500, error.message);
    res.json({ posts: data, total: count, limit, offset });
  })
);

// GET /api/blog/:slug  — full post by slug (public)
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', req.params.slug)
      .eq('published', true)
      .maybeSingle();

    if (error) throw httpError(500, error.message);
    if (!data) throw httpError(404, 'Post not found');
    res.json(data);
  })
);

// --- Admin (write) endpoints — require x-api-key ---

// POST /api/blog
router.post(
  '/',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const b = req.body || {};
    if (!b.title) throw httpError(400, 'title is required');

    const published = Boolean(b.published);
    const payload = {
      title: b.title,
      slug: b.slug ? slugify(b.slug) : slugify(b.title),
      excerpt: b.excerpt ?? null,
      content: b.content ?? null,
      cover_image: b.cover_image ?? null,
      tags: Array.isArray(b.tags) ? b.tags : [],
      published,
      published_at: published ? b.published_at || new Date().toISOString() : null,
    };

    const { data, error } = await supabase.from('blog_posts').insert(payload).select().single();
    if (error) throw httpError(error.code === '23505' ? 409 : 500, error.message);
    res.status(201).json(data);
  })
);

// PATCH /api/blog/:id
router.patch(
  '/:id',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const b = req.body || {};
    const allowed = ['title', 'slug', 'excerpt', 'content', 'cover_image', 'tags', 'published', 'published_at'];
    const payload = {};
    for (const key of allowed) {
      if (b[key] !== undefined) payload[key] = key === 'slug' ? slugify(b[key]) : b[key];
    }
    // If publishing for the first time and no published_at given, set it now.
    if (b.published === true && b.published_at === undefined) {
      payload.published_at = new Date().toISOString();
    }
    if (Object.keys(payload).length === 0) throw httpError(400, 'No valid fields to update');

    const { data, error } = await supabase
      .from('blog_posts')
      .update(payload)
      .eq('id', req.params.id)
      .select()
      .maybeSingle();

    if (error) throw httpError(error.code === '23505' ? 409 : 500, error.message);
    if (!data) throw httpError(404, 'Post not found');
    res.json(data);
  })
);

// DELETE /api/blog/:id
router.delete(
  '/:id',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const { error, count } = await supabase
      .from('blog_posts')
      .delete({ count: 'exact' })
      .eq('id', req.params.id);

    if (error) throw httpError(500, error.message);
    if (!count) throw httpError(404, 'Post not found');
    res.status(204).end();
  })
);

export default router;
