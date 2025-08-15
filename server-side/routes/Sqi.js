import express from 'express';
import { protect } from '../middleware/auth.js';
import { computeForStudent, payloadForSummaryAgent } from '../controllers/sqi.js';

const router = express.Router();

router.get('/:student_id/compute', protect, computeForStudent);
router.get('/:student_id/payload', protect, payloadForSummaryAgent);

export default router;
