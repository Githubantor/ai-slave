import { Router } from 'express';
import { getApprovals, createApproval, approveRequest, rejectRequest } from '../controllers/approvalController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, getApprovals);
router.post('/', protect, createApproval);
router.patch('/:id/approve', protect, approveRequest);
router.patch('/:id/reject', protect, rejectRequest);

export default router;
