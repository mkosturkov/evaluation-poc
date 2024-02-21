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

export interface EvaluationService {
  getCriteria(): Promise<Criterion[]>
  getOffers(): Promise<Offer[]>
  saveScores(offerId: Offer['id'], scores: EvaluationScore[]): Promise<void>
  addCriterion(criterion: NewCriterion): Promise<Criterion['id']>
  updateCriterion(criterion: Criterion): Promise<void>
  removeCriterion(id: Criterion['id']): Promise<void>
}
