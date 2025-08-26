import Attempt from '../models/Attempts.js';
import { computeSQI, toSummaryAgentPayload } from '../utils/SqiEngine.js';
import { uploadJSON } from './Data.js';

export const computeForStudent = async (req, res) => {
  const { student_id } = req.params;
  const doc = await Attempt.findOne({ student_id });
  if (!doc) return res.status(404).json({ message: 'No attempts found for student' });

  const result = computeSQI(doc.toObject());
  res.json(result);
};

export const payloadForSummaryAgent = async (req, res) => {
  const { student_id } = req.params;
  const doc = await Attempt.findOne({ student_id });
  if (!doc) return res.status(404).json({ message: 'No attempts found for student' });

  const result = computeSQI(doc.toObject());
  const payload = toSummaryAgentPayload(result);

  res.setHeader('Content-Disposition', `attachment; filename=summary_customizer_input.json`);
  res.json(payload);
};

export const previewSummaryPayload = async (req, res) => {
  try {
    const { student_id, attempts } = req.body || {};
    if (!student_id || !Array.isArray(attempts)) {
      return res.status(400).json({ message: "student_id and attempts[] are required" });
    }
    
    const tempDoc = { student_id, attempts };

    const result = computeSQI(tempDoc);

    const payload = toSummaryAgentPayload(result);

    return res.json(payload);
  } catch (err) {
    console.error("Error in previewSummaryPayload:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


