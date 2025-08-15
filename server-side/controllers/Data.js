import fs from "fs";
import Attempt from "../models/Attempts.js";
import { csvToAttempts } from "../utils/CsvParser.js";

// JSON upload - merges attempts without duplicates
export const uploadJSON = async (req, res) => {
  try {
    const { student_id, attempts } = req.body || {};
    if (!student_id || !Array.isArray(attempts)) {
      return res.status(400).json({ message: "student_id and attempts[] are required" });
    }

    const doc = await Attempt.findOneAndUpdate(
      { student_id },
      { $addToSet: { attempts: { $each: attempts } } }, // Merge without duplicates
      { upsert: true, new: true }
    );

    res.status(201).json(doc);
  } catch (err) {
    console.error("Error in uploadJSON:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CSV upload - merges attempts without duplicates
export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const csvText = fs.readFileSync(req.file.path, "utf8");
    const { student_id = req.body.student_id || "S000" } = req.body;

    const payload = await csvToAttempts(csvText, student_id);

    const doc = await Attempt.findOneAndUpdate(
      { student_id: payload.student_id },
      { $addToSet: { attempts: { $each: payload.attempts } } }, // Merge without duplicates
      { upsert: true, new: true }
    );

    fs.unlinkSync(req.file.path);
    res.status(201).json(doc);
  } catch (err) {
    console.error("Error in uploadCSV:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch attempts for a student
export const getAttempts = async (req, res) => {
  try {
    const student_id = req.params.student_id;
    const doc = await Attempt.findOne({ student_id });

    if (!doc) {
      return res.status(404).json({ message: "No attempts found for student" });
    }

    res.json(doc);
  } catch (err) {
    console.error("Error in getAttempts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
