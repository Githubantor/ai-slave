import { Router } from 'express';
import { getActivity, createActivity } from '../controllers/activityController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, getActivity);
router.post('/', protect, createActivity);

export default router;
