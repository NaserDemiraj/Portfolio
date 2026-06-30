// ============================================================
//  Drop-in frontend helper for the portfolio.
//  Paste into your site (or import) and call these functions.
//  Change API_BASE to your deployed backend URL.
// ============================================================
const API_BASE = 'http://localhost:3000/api'; // e.g. 'https://your-backend.vercel.app/api'

// --- Projects ---
export async function getProjects({ featuredOnly = false } = {}) {
  const url = `${API_BASE}/projects${featuredOnly ? '?featured=true' : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load projects');
  return res.json();
}

export async function getProject(slug) {
  const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error('Project not found');
  return res.json();
}

// --- Blog ---
export async function getBlogPosts({ limit = 20, offset = 0, tag } = {}) {
  const params = new URLSearchParams({ limit, offset });
  if (tag) params.set('tag', tag);
  const res = await fetch(`${API_BASE}/blog?${params}`);
  if (!res.ok) throw new Error('Failed to load posts');
  return res.json(); // { posts, total, limit, offset }
}

export async function getBlogPost(slug) {
  const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error('Post not found');
  return res.json();
}

// --- Contact form ---
// Wire this to your form's submit handler.
export async function sendContactMessage({ name, email, subject, message }) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to send message');
  return data;
}

/* ---- Example: wiring a contact form ----
const form = document.querySelector('#contact-form');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  try {
    await sendContactMessage({
      name: fd.get('name'),
      email: fd.get('email'),
      subject: fd.get('subject'),
      message: fd.get('message'),
    });
    alert('Message sent! Thank you.');
    form.reset();
  } catch (err) {
    alert(err.message);
  }
});
*/
