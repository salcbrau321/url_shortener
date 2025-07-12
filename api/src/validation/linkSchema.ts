import { z } from 'zod';

export const shortenUrlSchema = z.object({
    url: z.string().url()
});
