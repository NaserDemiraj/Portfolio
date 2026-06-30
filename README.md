# Naser Demiraj — Portfolio Backend

A small REST API powering the portfolio: **projects**, **blog posts**, and a **contact form**.

- **Stack:** Node.js + Express
- **Database:** Supabase (PostgreSQL)
- **Deploy:** Vercel (serverless)
- **Auth:** single API key (`x-api-key` header) for admin/write endpoints

---

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste the contents of [`db/schema.sql`](db/schema.sql), and run it.
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key (under "Project API keys") → `SUPABASE_SERVICE_ROLE_KEY`
     ⚠️ Keep this secret. It bypasses Row Level Security. Never expose it in the frontend.

## 2. Configure environment

```bash
cp .env.example .env
```

Fill in `.env`. Generate a strong `ADMIN_API_KEY`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 3. Run locally

```bash
npm install
npm run dev          # auto-reload
# or: npm start
```

Visit http://localhost:3000/api/health → `{ "status": "ok" }`

## 4. Deploy to Vercel

```bash
npm i -g vercel
vercel            # first time: link/create project
vercel --prod     # deploy to production
```

In the **Vercel dashboard → Settings → Environment Variables**, add:
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_API_KEY`, `ALLOWED_ORIGINS`.

Then redeploy. Your API will be live at `https://<project>.vercel.app/api/...`

---

## API reference

Public endpoints need no auth. **Admin** endpoints require header `x-api-key: <ADMIN_API_KEY>`.

### Health
| Method | Path           | Notes  |
|--------|----------------|--------|
| GET    | `/api/health`  | Status |

### Projects
| Method | Path                  | Auth  | Notes |
|--------|-----------------------|-------|-------|
| GET    | `/api/projects`       | —     | Published projects. `?featured=true` to filter. |
| GET    | `/api/projects/:slug` | —     | Single published project. |
| POST   | `/api/projects`       | Admin | Create. |
| PATCH  | `/api/projects/:id`   | Admin | Update. |
| DELETE | `/api/projects/:id`   | Admin | Delete. |

### Blog
| Method | Path              | Auth  | Notes |
|--------|-------------------|-------|-------|
| GET    | `/api/blog`       | —     | Published posts. `?tag=`, `?limit=`, `?offset=`. |
| GET    | `/api/blog/:slug` | —     | Single published post. |
| POST   | `/api/blog`       | Admin | Create. |
| PATCH  | `/api/blog/:id`   | Admin | Update. |
| DELETE | `/api/blog/:id`   | Admin | Delete. |

### Contact
| Method | Path               | Auth  | Notes |
|--------|--------------------|-------|-------|
| POST   | `/api/contact`     | —     | Submit a message (rate-limited, honeypot-protected). |
| GET    | `/api/contact`     | Admin | List messages. `?unread=true`, `?limit=`, `?offset=`. |
| PATCH  | `/api/contact/:id` | Admin | Mark read/unread (`{ "read": true }`). |
| DELETE | `/api/contact/:id` | Admin | Delete. |

---

## Example requests

Create a project:

```bash
curl -X POST https://<project>.vercel.app/api/projects \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ADMIN_API_KEY" \
  -d '{
    "title": "My Cool App",
    "description": "A thing I built",
    "tech_stack": ["React", "Node.js"],
    "live_url": "https://example.com",
    "featured": true
  }'
```

Submit a contact message:

```bash
curl -X POST https://<project>.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{ "name": "Jane", "email": "jane@example.com", "message": "Hi!" }'
```

---

## Connect the frontend

See [`frontend-snippet.js`](frontend-snippet.js) for ready-to-use `fetch` helpers
(`getProjects`, `getBlogPosts`, `sendContactMessage`, …). Set `API_BASE` to your
deployed URL, and add your site's origin to `ALLOWED_ORIGINS` in the backend env.

> Since there's no admin dashboard, manage content via the admin API (curl/Postman)
> or directly in the **Supabase Table Editor**.
