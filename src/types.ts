export type NewCriterion = {
  name: string
  weight: number
}

export type Criterion = NewCriterion & { id: string }

export type EvaluationScore = {
  criterionId: Criterion['id']
  score: number
}

export type Offer = {
  id: string
  offerName: string
  evaluationScores: EvaluationScore[]
}
