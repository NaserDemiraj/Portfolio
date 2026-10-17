# Naser Demiraj — Portfolio

Personal site and API for [naserdemiraj.vercel.app](https://naserdemiraj.vercel.app).

- **Site** (`web/`): React 19 + TypeScript + Vite, with motion by [GSAP](https://gsap.com) and [Lenis](https://github.com/darkroomengineering/lenis), plus components from [React Bits](https://reactbits.dev)
- **API** (`api/`, `src/`): Node.js + Express on Vercel serverless, Supabase (PostgreSQL), and a Groq-powered chat assistant
- **Deploy:** Vercel. `npm run build` outputs `dist/`, and `/api/*` is rewritten to the Express function

---

## Site

```bash
npm install
npm run dev        # Vite on http://localhost:5173 (proxies /api → :3000)
npm run dev:api    # in a second terminal, for the chat assistant
npm run typecheck
npm run build      # → dist/
```

```
web/
  index.html              meta, Open Graph, JSON-LD
  public/                 CV, favicon, og.png, project screenshots
  src/
    data/                 all copy: profile, projects, skills (edit content here)
    sections/             one component per page section
    motion/               GSAP setup + Lenis smooth scroll (one shared ticker)
    components/reactbits/ vendored React Bits components (see Credits)
    styles/global.css     design tokens + styles
```

**Motion:** Lenis smooth scroll runs on GSAP's ticker and feeds `ScrollTrigger.update`, so scroll and every tween share one frame loop. Each animation is registered inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, so reduced-motion users get the static page.

### Credits

| Component | Used for | Source |
|---|---|---|
| FaultyTerminal | hero CRT backdrop | [React Bits](https://reactbits.dev/backgrounds/faulty-terminal) |
| ScrollStack | stacked featured projects | [React Bits](https://reactbits.dev/components/scroll-stack) |
| SpotlightCard | side-project cards | [React Bits](https://reactbits.dev/components/spotlight-card) |
| ScrollReveal | about statement | [React Bits](https://reactbits.dev/text-animations/scroll-reveal) |
| LogoLoop | tech-stack strip | [React Bits](https://reactbits.dev/animations/logo-loop) |
| Magnet, ClickSpark | contact buttons | [React Bits](https://reactbits.dev/animations/magnet) |

React Bits components are by David Haz, under [MIT + Commons Clause](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md). They're used here as part of a website; the components themselves aren't redistributed for sale.

---

# API

A small REST API: **projects**, **blog posts**, a **contact form** and the **chat assistant**.

- **Auth:** a single API key (`x-api-key` header) for admin/write endpoints

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
npm run dev:api      # auto-reload
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
