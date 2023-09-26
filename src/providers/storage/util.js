export async function withRetries(fn, args, retries = 3, err = null) {
  if (!retries) {
    throw new Error(err);
  }
  return fn(...args).catch(() => withRetries(fn, args, retries - 1, err));
}
