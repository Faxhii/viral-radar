import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        console.log(`[Vercel Proxy] Resolving: ${url}`);

        // Cycle through instances if one fails
        const instances = [
            'https://api.cobalt.tools/api/json',
            'https://co.wuk.sh/api/json',
            'https://cobalt.kwiatekmiki.pl/api/json'
        ];

        for (const apiBase of instances) {
            try {
                const response = await fetch(apiBase, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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
