import { Router } from 'express';
import { getDocuments, createDocument, deleteDocument } from '../controllers/knowledgeController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, getDocuments);
router.post('/', protect, createDocument);
router.delete('/:id', protect, deleteDocument);

export default router;
