export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export interface Link {
    id: number
    shortCode: string
    originalUrl: string
    createdAt: string
}

export async function shortenurl(url: string): Promise<string> {
    const res = await fetch(`${API_BASE}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });

    if (!res.ok) throw new Error(`Failed with status ${res.status}`);
    const { shortCode } = await res.json();
    
    return shortCode;
}

export async function fetchLinks(): Promise<Link[]> {
    const res = await fetch(`${API_BASE}/links`);

    if (!res.ok) throw new Error(`Failed with status ${res.status}`);
    
    return res.json();
}