import { Router } from 'express';
import { handleLogin } from '../controller/authController';

const router = Router();

router.post('/', handleLogin);

export default router;
