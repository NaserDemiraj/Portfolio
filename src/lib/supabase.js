import { createClient } from '@supabase/supabase-js';

// Lazy Supabase client. We don't create it at import time so the server can run
// with only a Gemini key (chat-only) — Supabase is needed only for the
// projects/blog/contact endpoints, and it initializes on first use.
let _client = null;

function init() {
  if (_client) return _client;
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env ' +
        'to use the projects/blog/contact endpoints. (The chat endpoint does not need Supabase.)'
    );
  }
  _client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

// Proxy so existing `supabase.from(...)` calls keep working but only trigger
// initialization (and the config check) when actually used.
export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = init();
      const value = client[prop];
      return typeof value === 'function' ? value.bind(client) : value;
    },
  }
);
