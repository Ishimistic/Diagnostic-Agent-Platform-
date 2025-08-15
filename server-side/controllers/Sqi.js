import Attempt from '../models/Attempts.js';
import { computeSQI, toSummaryAgentPayload } from '../utils/SqiEngine.js';

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
