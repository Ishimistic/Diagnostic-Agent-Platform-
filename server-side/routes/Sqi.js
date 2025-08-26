import express from 'express';
import { protect } from '../middleware/auth.js';
import { computeForStudent, payloadForSummaryAgent, previewSummaryPayload } from '../controllers/Sqi.js';

const router = express.Router();

router.get('/:student_id/compute', protect, computeForStudent);
router.get('/:student_id/payload', protect, payloadForSummaryAgent);
router.post('/preview', protect, previewSummaryPayload);

export default router;
