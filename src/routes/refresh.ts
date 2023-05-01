import { Router } from 'express';
import { handleRefreshToken } from '../controller/refreshTokenController';

const router = Router();

router.get('/', handleRefreshToken);

export default router;