import express from 'express';
import { protect } from '../middleware/auth.js';
import { savePrompt, getLatestPrompt } from '../controllers/prompt.js';
import { generateDiagnostic } from '../controllers/prompt.js';

const router = express.Router();

router.post('/prompt', protect, savePrompt);
router.get('/prompt', protect, getLatestPrompt);
router.post('/generate', protect, generateDiagnostic);

export default router;
