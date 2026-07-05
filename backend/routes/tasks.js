import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask, getTaskStats } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, getTasks);
router.get('/stats', protect, getTaskStats);
router.post('/', protect, createTask);
router.patch('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

export default router;
