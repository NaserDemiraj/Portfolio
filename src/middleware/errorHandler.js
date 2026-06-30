// Wraps async route handlers so thrown errors reach the error middleware.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// 404 for unmatched routes.
export function notFound(req, res) {
  res.status(404).json({ error: `Not found: ${req.method} ${req.originalUrl}` });
}

// Central error handler.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('[error]', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.publicMessage || 'Internal server error',
  });
}

// Helper to throw HTTP errors with a safe public message.
export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  err.publicMessage = message;
  return err;
}
