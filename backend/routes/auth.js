import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/register', (req, res) => {
  res.json({ message: 'This endpoint requires a POST request with JSON body: { "name": "...", "email": "...", "password": "..." }', method: 'POST', url: '/api/auth/register' });
});
router.post('/register', register);
router.get('/login', (req, res) => {
  res.json({ message: 'This endpoint requires a POST request with JSON body: { "email": "...", "password": "..." }', method: 'POST', url: '/api/auth/login' });
});
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
