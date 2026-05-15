import type { APIRoute } from 'astro';
export const POST: APIRoute = async ({ request }) => {
  const listmonkUrl = import.meta.env.PUBLIC_LISTMONK_URL;
  const listmonkUser = import.meta.env.PUBLIC_LISTMONK_USER;
  const listmonkPassword = import.meta.env.PUBLIC_LISTMONK_PASSWORD;
  const listmonkListId = Number(import.meta.env.PUBLIC_LISTMONK_LIST_ID ?? 4);
  if (!listmonkUrl || !listmonkUser || !listmonkPassword) {
    return new Response(JSON.stringify({ error: 'Newsletter not configured' }),
  {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let name: string, email: string;
  try {
    const body = await request.json();
    name = String(body.name ?? '').trim();
    email = String(body.email ?? '').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const credentials = btoa(`${listmonkUser}:${listmonkPassword}`);

  try {
    const res = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify({
        email,
        name: name || email,
        status: 'enabled',
        lists: [listmonkListId],
      }),
    });

    if (res.ok || res.status === 409) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Subscription failed' }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Network error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
