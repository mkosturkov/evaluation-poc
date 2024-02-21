import { ref } from 'vue';
import { Criterion, EvaluationScore, NewCriterion, Offer } from 'src/types';
import { service } from 'src/service'

const evaluationCriteria = ref<Criterion[]>([])

const offers = ref<Offer[]>([])

const init = async () => {
  const [c, l] = await Promise.all([
    service.getCriteria(),
    service.getOffers()
  ])
  console.log(c, l)
  evaluationCriteria.value = c
  offers.value = l
}

const saveScores = async (offerId: string, scores: EvaluationScore[]): Promise<void> => {
  await service.saveScores(offerId, scores)
  offers.value = await service.getOffers()
}

const addCriterion = async (newCriterion: NewCriterion): Promise<void> => {
  await service.addCriterion(newCriterion)
  await init()
}

const updateCriterion = async (criterion: Criterion): Promise<void> => {
  await service.updateCriterion(criterion)
  await init()
}

const removeCriterion = async (id: Criterion['id']): Promise<void> => {
  await service.removeCriterion(id)
  await init()
}

export {
  offers,
  evaluationCriteria,

  init,
  saveScores,
  addCriterion,
  updateCriterion,
  removeCriterion
}
