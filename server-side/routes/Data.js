import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { uploadCSV, uploadJSON, getAttempts } from '../controllers/data.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload/json', protect, uploadJSON);
router.post('/upload/csv', protect, upload.single('file'), uploadCSV);
router.get('/:student_id', protect, getAttempts);

export default router;
