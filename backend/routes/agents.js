import { Router } from 'express';
import { getAgents, getAgent, updateAgent, createAgentActivity } from '../controllers/agentController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, getAgents);
router.get('/:id', protect, getAgent);
router.patch('/:id', protect, updateAgent);
router.post('/:id/activity', protect, createAgentActivity);

export default router;
