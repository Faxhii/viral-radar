import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        console.log(`[Vercel Proxy] Resolving: ${url}`);

        // Cycle through instances if one fails
        const cobaltInstances = [
            'https://api.cobalt.tools',
            'https://cobalt.kwiatekmiki.pl',
            'https://co.wuk.sh',
            'https://cobalt.teambart.org',
            'https://hyper.cobalt.tools',
            'https://cobalt.sneed.today'
        ];

        for (const baseUrl of cobaltInstances) {
            const apiBase = baseUrl + '/api/json';
            try {
                const response = await fetch(apiBase, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Referer': 'https://cobalt.tools/'
                    },
                    body: JSON.stringify({
                        url: url,
                        filenamePattern: 'basic'
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.url) {
                        console.log(`[Vercel Proxy] Success with ${apiBase}`);
                        return NextResponse.json({ url: data.url });
                    }
                } else {
                    console.warn(`[Vercel Proxy] Failed with ${apiBase}: ${response.status}`);
                }
            } catch (e) {
                console.error(`[Vercel Proxy] Error with ${apiBase}:`, e);
            }
        }

        return NextResponse.json({ error: "All providers failed" }, { status: 500 });

    } catch (error) {
        console.error("[Vercel Proxy] Critical Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
