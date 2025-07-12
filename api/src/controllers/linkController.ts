import { Request, Response, NextFunction } from 'express';
import { db } from '../db/drizzle';
import { links } from '../db/schema';
import { generateShortCode } from '../utils/generateShortCode';
import { eq } from 'drizzle-orm';
import { shortenUrlSchema } from '../validation/linkSchema';

export async function shortenUrl(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = shortenUrlSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ error: 'Invalid URL' });

        const code = generateShortCode();
        await db.insert(links).values({
            originalUrl: parsed.data.url,
            shortCode: code
        });

        res.status(201).json({shorCode: code});
    } catch (err) {
        next(err);
    }
}

export async function getAllLinks(_: Request, res: Response, next: NextFunction) {
    try {
        const result = await db.select().from(links).orderBy(links.createdAt);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function redirect(req: Request, res: Response, next: NextFunction) {
    try {
        const code = req.params.code;
        const rows = await db.select().from(links).where(eq(links.shortCode, code));

        if (!rows[0]) return res.status(404).send('Not found');
        res.redirect(rows[0].originalUrl);
    
    } catch(err) {
        next(err);
    }
}
