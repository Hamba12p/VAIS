import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_MS = 60_000;
const RATE_LIMIT_PER_IP = 3;
const saw: Record<string, number[]> = {};

const schema = {
  name: (value: unknown) => typeof value === 'string' && value.trim().length > 1,
  email: (value: unknown) => typeof value === 'string' && /.+@.+\..+/.test(value.trim()),
  message: (value: unknown) => typeof value === 'string' && value.trim().length > 20,
  type: (value: unknown) => typeof value === 'string' && ['Government', 'Institutional', 'Enterprise', 'Press'].includes(value),
};

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'local';
  const now = Date.now();
  const recent = saw[ip] || [];
  const recentInWindow = recent.filter((stamp) => now - stamp < RATE_LIMIT_MS);

  if (recentInWindow.length >= RATE_LIMIT_PER_IP) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
  }

  const form = await request.formData();
  const payload = Object.fromEntries(form.entries());
  const honeypot = form.get('website');

  if (honeypot !== null && String(honeypot).trim() !== '') {
    return NextResponse.json({ error: 'Submission rejected.' }, { status: 400 });
  }

  const invalid = Object.entries(schema).find(([key, validator]) => !validator((payload as Record<string, unknown>)[key]));
  if (invalid) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT || process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ error: 'Contact endpoint is not configured.' }, { status: 500 });
  }

  const body = {
    name: String((payload as Record<string, unknown>).name).trim(),
    email: String((payload as Record<string, unknown>).email).trim(),
    type: String((payload as Record<string, unknown>).type),
    message: String((payload as Record<string, unknown>).message).trim(),
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'The message could not be sent. Please try again.' }, { status: 502 });
  }

  saw[ip] = [...recentInWindow, now];
  return NextResponse.json({ ok: true }, { status: 200 });
}
