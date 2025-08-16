const importanceW = { A: 1.0, B: 0.7, C: 0.5 };
const difficultyW = { E: 0.8, M: 1.0, H: 1.4 };
const typeW = { Practical: 1.1, Theory: 1.0 };

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export function computeAttemptScore(a) {
  let base = a.correct ? (a.marks ?? 1) : -(a.neg_marks ?? 0);

  let weighted =
    base *
    (importanceW[a.importance] ?? 0.7) *
    (difficultyW[a.difficulty] ?? 1.0) *
    (typeW[a.type] ?? 1.0);

  // behavior adjustments
  const t = Number(a.time_spent_sec ?? 90);
  const exp = Number(a.expected_time_sec ?? 90);
  if (exp && t > 1.5 * exp) weighted *= 0.9; // slow solve
  if (exp && t > 2.0 * exp) weighted *= 0.8; // very slow (cumulative)
  if (a.marked_review && !a.correct) weighted *= 0.9; // marked for review but wrong
  if (a.revisits && a.correct) weighted += 0.2 * (a.marks ?? 1); // bonus for revisit and correct

  const maxPossible =
    (a.marks ?? 1) *
    (importanceW[a.importance] ?? 0.7) *
    (difficultyW[a.difficulty] ?? 1.0) *
    (typeW[a.type] ?? 1.0);

  return { weighted, maxPossible };
}

export function computeSQI(data) {
  const byKey = (a) => `${a.topic}|||${a.concept}`;

  let sumWeighted = 0;
  let sumMax = 0;

  const conceptAgg = new Map();

  for (const a of data.attempts || []) {
    const { weighted, maxPossible } = computeAttemptScore(a);
    sumWeighted += weighted;
    sumMax += Math.max(0, maxPossible); // prevent negatives in denom

    const key = byKey(a);
    const c = conceptAgg.get(key) || {
      topic: a.topic,
      concept: a.concept,
      sumWeighted: 0,
      sumMax: 0,
      wrongOnce: 0,
      importance: a.importance
    };

    c.sumWeighted += weighted;
    c.sumMax += Math.max(0, maxPossible);

    if (!a.correct) c.wrongOnce = 1;

    conceptAgg.set(key, c);
  }

  const tempSqi = clamp((sumWeighted / (sumMax || 1)) * 100, 0, 100);

  // per-concept normalized 0..100
  const concept_scores = [...conceptAgg.values()].map((c) => ({
    topic: c.topic,
    concept: c.concept,
    sqi: clamp((c.sumWeighted / (c.sumMax || 1)) * 100, 0, 100),
    importance: c.importance,
    wrongOnce: c.wrongOnce
  }));

  // Ranked concepts for summary
  const ranked_concepts_for_summary = concept_scores
    .map((c) => {
      const imp = importanceW[c.importance] ?? 0.7;
      const inv_read_time = 0.7;
      const diag_quality = 1 - c.sqi / 100;
      const wrong_flag = c.wrongOnce ? 1 : 0;

      const weight = 0.40 * wrong_flag + 0.25 * imp + 0.20 * inv_read_time + 0.15 * diag_quality;

      const reasons = [];
      if (wrong_flag) reasons.push('Wrong earlier');
      if ((importanceW[c.importance] ?? 0.7) >= 1) reasons.push('High importance (A)');
      if (c.sqi < 60) reasons.push('Low diagnostic score');

      return {
        topic: c.topic,
        concept: c.concept,
        weight: Number(weight.toFixed(2)),
        reasons
      };
    })
    .sort((a, b) => b.weight - a.weight)
    .slice(10);

  return {
    student_id: data.student_id,
    overall_sqi: Number(tempSqi.toFixed(2)),
    concept_scores,
    ranked_concepts_for_summary
  };
}

export function toSummaryAgentPayload(result) {
  return {
    student_id: result.student_id,
    overall_sqi: result.overall_sqi,
    concept_scores: result.concept_scores.map((c) => ({
      topic: c.topic,
      concept: c.concept,
      sqi: Number(c.sqi.toFixed(1))
    })),
    ranked_concepts_for_summary: result.ranked_concepts_for_summary,
    metadata: result.metadata
  };
}
