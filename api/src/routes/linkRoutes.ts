import { Router } from 'express';
import { shortenUrl, getAllLinks, redirect } from '../controllers/linkController';

const router = Router();

router.post('/shorten', shortenUrl);
router.get('/links', getAllLinks);
router.get('/:code', redirect);

export default router;