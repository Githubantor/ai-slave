import { Router } from 'express';
import { getGoals, createGoal, updateGoal, deleteGoal, analyzeGoal } from '../controllers/goalController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, getGoals);
router.post('/', protect, createGoal);
router.post('/analyze', protect, analyzeGoal);
router.patch('/:id', protect, updateGoal);
router.delete('/:id', protect, deleteGoal);

export default router;
