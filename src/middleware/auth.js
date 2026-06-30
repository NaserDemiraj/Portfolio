// Simple API-key auth for write/admin endpoints.
// The client must send the key in the "x-api-key" header.
export function requireApiKey(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;

  if (!expected) {
    return res.status(500).json({ error: 'Server misconfigured: ADMIN_API_KEY not set.' });
  }

  const provided = req.get('x-api-key');

  if (!provided || provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized. Valid x-api-key header required.' });
  }

  next();
}
