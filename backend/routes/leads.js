import { Router } from 'express';
import { researchLeads, getLeads, updateLead } from '../controllers/leadController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.post('/research', researchLeads);
router.get('/', getLeads);
router.patch('/:id', updateLead);

export default router;
