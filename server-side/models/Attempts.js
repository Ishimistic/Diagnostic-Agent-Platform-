import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema(
  {
    student_id: { type: String, required: true, index: true },
    attempts: [
      {
        topic: { type: String, required: true },
        concept: { type: String, required: true },
        importance: { type: String, enum: ['A', 'B', 'C'], default: 'B' },
        difficulty: { type: String, enum: ['E', 'M', 'H'], default: 'M' },
        type: { type: String, enum: ['Practical', 'Theory'], default: 'Theory' },
        case_based: { type: Boolean, default: false },
        correct: { type: Boolean, required: true },
        marks: { type: Number, default: 1 },
        neg_marks: { type: Number, default: 0 },
        expected_time_sec: { type: Number, default: 90 },
        time_spent_sec: { type: Number, default: 90 },
        marked_review: { type: Boolean, default: false },
        revisits: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Attempt', attemptSchema);
