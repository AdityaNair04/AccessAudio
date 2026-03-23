import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const spoken = searchParams.get('spoken');
  const signed = searchParams.get('signed');

  if (!text || !spoken || !signed) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const targetUrl = `https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?text=${encodeURIComponent(text)}&spoken=${spoken}&signed=${signed}`;
  console.log(`[PROXY] Proxying to ${targetUrl}`);

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://sign.mt/',
        'Origin': 'https://sign.mt'
      }
    });

    console.log(`[PROXY] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[PROXY ERROR] Fetch failed: ${response.status}`, errorText);
      return NextResponse.json({ error: `Failed to fetch from target: ${response.status}` }, { status: response.status });
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const text = await response.text();
      return new Response(text, {
        status: response.status,
        headers: { 'Content-Type': contentType || 'text/plain' }
      });
    }
  } catch (error) {
    console.error('[PROXY ERROR] Internal error:', error);
    return NextResponse.json({ error: `Internal server error: ${error.message}` }, { status: 500 });
  }
}
