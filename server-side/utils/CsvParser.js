import { parse } from 'csv-parse';

/**
 * Accepts CSV text with headers matching the Attempt item fields and
 * returns { student_id, attempts[] }.
 */
export const csvToAttempts = async (csvText, student_id = 'S000') =>
  new Promise((resolve, reject) => {
    const records = [];
    parse(csvText, { columns: true, trim: true })
      .on('readable', function () {
        let record;
        while ((record = this.read())) records.push(record);
      })
      .on('end', () => {
        const attempts = records.map((r) => ({
          topic: r.topic,
          concept: r.concept,
          importance: r.importance || 'B',
          difficulty: r.difficulty || 'M',
          type: r.type || 'Theory',
          case_based: r.case_based === 'true' || r.case_based === true,
          correct: r.correct === 'true' || r.correct === true,
          marks: Number(r.marks ?? 1),
          neg_marks: Number(r.neg_marks ?? 0),
          expected_time_sec: Number(r.expected_time_sec ?? 90),
          time_spent_sec: Number(r.time_spent_sec ?? 90),
          marked_review: r.marked_review === 'true' || r.marked_review === true,
          revisits: Number(r.revisits ?? 0)
        }));
        resolve({ student_id, attempts });
      })
      .on('error', reject);
  });
