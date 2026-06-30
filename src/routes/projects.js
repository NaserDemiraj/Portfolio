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

// GET /api/projects  — list published projects (public)
// Query: ?featured=true  to only return featured ones
router.get(
  '/',
  asyncHandler(async (req, res) => {
    let query = supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (req.query.featured === 'true') query = query.eq('featured', true);

    const { data, error } = await query;
    if (error) throw httpError(500, error.message);
    res.json(data);
  })
);

// GET /api/projects/:slug  — single project by slug (public)
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', req.params.slug)
      .eq('published', true)
      .maybeSingle();

    if (error) throw httpError(500, error.message);
    if (!data) throw httpError(404, 'Project not found');
    res.json(data);
  })
);

// --- Admin (write) endpoints below — require x-api-key ---

// POST /api/projects
router.post(
  '/',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const b = req.body || {};
    if (!b.title) throw httpError(400, 'title is required');

    const payload = {
      title: b.title,
      slug: b.slug ? slugify(b.slug) : slugify(b.title),
      description: b.description ?? null,
      content: b.content ?? null,
      tech_stack: Array.isArray(b.tech_stack) ? b.tech_stack : [],
      image_url: b.image_url ?? null,
      live_url: b.live_url ?? null,
      repo_url: b.repo_url ?? null,
      featured: Boolean(b.featured),
      sort_order: Number.isInteger(b.sort_order) ? b.sort_order : 0,
      published: b.published === undefined ? true : Boolean(b.published),
    };

    const { data, error } = await supabase.from('projects').insert(payload).select().single();
    if (error) throw httpError(error.code === '23505' ? 409 : 500, error.message);
    res.status(201).json(data);
  })
);

// PATCH /api/projects/:id
router.patch(
  '/:id',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const b = req.body || {};
    const allowed = [
      'title', 'slug', 'description', 'content', 'tech_stack',
      'image_url', 'live_url', 'repo_url', 'featured', 'sort_order', 'published',
    ];
    const payload = {};
    for (const key of allowed) {
      if (b[key] !== undefined) payload[key] = key === 'slug' ? slugify(b[key]) : b[key];
    }
    if (Object.keys(payload).length === 0) throw httpError(400, 'No valid fields to update');

    const { data, error } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', req.params.id)
      .select()
      .maybeSingle();

    if (error) throw httpError(error.code === '23505' ? 409 : 500, error.message);
    if (!data) throw httpError(404, 'Project not found');
    res.json(data);
  })
);

// DELETE /api/projects/:id
router.delete(
  '/:id',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const { error, count } = await supabase
      .from('projects')
      .delete({ count: 'exact' })
      .eq('id', req.params.id);

    if (error) throw httpError(500, error.message);
    if (!count) throw httpError(404, 'Project not found');
    res.status(204).end();
  })
);

export default router;
