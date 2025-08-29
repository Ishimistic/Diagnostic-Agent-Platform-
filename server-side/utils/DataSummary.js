export function formatSummaryAgentPayload(result) {
  return {
    student_id: result.student_id,
    overall_sqi: Number(result.overall_sqi.toFixed(1)),

    topic_scores: (result.topic_scores || []).map(t => ({
      topic: t.topic,
      sqi: Number(t.sqi.toFixed(1))
    })),

    concept_scores: (result.concept_scores || []).map(c => ({
      topic: c.topic,
      concept: c.concept,
      sqi: Number(c.sqi.toFixed(1))
    })),

    ranked_concepts_for_summary: (result.ranked_concepts_for_summary || []).map(r => ({
      topic: r.topic,
      concept: r.concept,
      weight: Number(r.weight.toFixed(2)),
      reasons: r.reasons || []
    })),

    // metadata
    metadata: {
      diagnostic_prompt_version: "v1",
      computed_at: new Date().toISOString(),
      engine: "sqi-v0.1"
    }
  };
}
