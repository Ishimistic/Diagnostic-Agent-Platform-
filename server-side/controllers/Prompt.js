import Prompt from '../models/Prompts.js';

export const savePrompt = async (req, res) => {
  const { text, version } = req.body;
  if (!text) return res.status(400).json({ message: 'Prompt text is required' });

  const doc = await Prompt.create({ text, version: version || 'v1', createdBy: req.user?._id });
  res.status(201).json(doc);
};

export const getLatestPrompt = async (_req, res) => {
  const doc = await Prompt.findOne().sort({ createdAt: -1 });
  if (!doc) return res.status(404).json({ message: 'No prompt saved yet' });
  res.json(doc);
};

function pickRandomWeighted(weights) {
  const rnd = Math.random();
  let sum = 0;
  for (const [key, value] of Object.entries(weights)) {
    sum += value;
    if (rnd < sum) return key;
  }
  return Object.keys(weights)[0];
}

export const generateDiagnostic = async (req, res) => {
  try {
    const { text } = req.body; 
    // console.log("Text: ", text);
    if (!text) {
      return res.status(400).json({ message: "Prompt text is required" });
    }
    const totalQuestions = extractTotalQuestions(text) || 5;
    
    // RAG implementaion to be done
    const questions = [];

    const difficultySplit = { easy: 0.2, medium: 0.3, hard: 0.5 };
    const importanceSplit = { A: 0.5, B: 0.3, C: 0.2 };
    const types = ["practical", "theory"];

    // Example allocation of the generation -> later will be replaced by the RAG working
    for (let i = 0; i < totalQuestions; i++) {
      questions.push({
        topic: `Topic-${i + 1}`,
        concept: `Concept-${i + 1}`,
        importance: pickRandomWeighted(importanceSplit), 
        difficulty: pickRandomWeighted(difficultySplit),
        type: types[i % 2],
        caseFlag: Math.random() < 0.05, 
        marks: 2,
        negMarks: -0.5,
        expectedTime: getExpectedTime(i),
      });
    }

    res.json({ questions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function extractTotalQuestions(text) {
  const match = text.match(/(\d+)\s*[- ]?(question|questions|q)/i);
  return match ? parseInt(match[1], 10) : null;
}

function getExpectedTime(index) {
  if (index < 5) return 1; // 1 min for first 5 easy
  if (index < 10) return 2;
  return 3;
}
