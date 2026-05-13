export async function subscribeNewsletter(name, email) {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
