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

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://sign.mt/',
        'Origin': 'https://sign.mt'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Proxy fetch failed:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to fetch from target' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
