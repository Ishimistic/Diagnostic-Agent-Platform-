import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/Auth.js';
import { uploadCSV, uploadJSON, getAttempts } from '../controllers/Data.js';
import {formatSummaryAgentPayload} from '../utils/DataSummary.js'

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload/json', protect, uploadJSON);
router.post('/upload/csv', protect, upload.single('file'), uploadCSV);
router.get('/:student_id', protect, getAttempts);
router.post('/summary-preview', protect, formatSummaryAgentPayload);

export default router;
