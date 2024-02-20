import { reactive } from 'vue';
import { Criterion, EvaluationScore, NewCriterion, Offer } from 'components/types';

const evaluationCriteria = reactive<Criterion[]>([
  {
    id: 'a',
    name: 'Quality',
    weight: 2.5
  },
  {
    id: 'b',
    name: 'Delivery Speed',
    weight: 3.6
  },
  {
    id: 'c',
    name: 'Discount',
    weight: 2.2
  }
])

const offers = reactive<Offer[]>([
    {
      id: 'o1',
      offerName: 'Big Store of Stores',
      evaluationScores: [
        {
          criterionId: 'a',
          score: 2.8
        },
        {
          criterionId: 'b',
          score: 3.5
        },
        {
          criterionId: 'c',
          score: 0
        }
      ]
    },
    {
      id: 'o2',
      offerName: 'Pappa Beh\'s Merchandise',
      evaluationScores: [
        {
          criterionId: 'a',
          score: 1.9
        },
        {
          criterionId: 'b',
          score: 4
        },
        {
          criterionId: 'c',
          score: 3
        }
      ]
    },
    {
      id: 'o3',
      offerName: 'All You Need Goods',
      evaluationScores: [
        {
          criterionId: 'a',
          score: 4
        },
        {
          criterionId: 'b',
          score: -1.3
        },
        {
          criterionId: 'c',
          score: 1
        }
      ]
    },
    {
      id: 'o4',
      offerName: 'Flanders & Sons co.',
      evaluationScores: [
        {
          criterionId: 'a',
          score: 2
        },
        {
          criterionId: 'b',
          score: 0
        },
        {
          criterionId: 'c',
          score: 5
        }
      ]
    }
  ])

const saveScores = (offerId: string, scores: EvaluationScore[]): void => {
  const selectedOffer = offers.find((o) => o.id === offerId)
  if (selectedOffer) {
    selectedOffer.evaluationScores = scores
  }
}

const addCriterion = (newCriterion: NewCriterion): void => {
  const id = Math.random().toString()
  evaluationCriteria.push({ ...newCriterion, id })
  offers.forEach(o => o.evaluationScores.push({
    criterionId: id,
    score: 0
  }))
}

const updateCriterion = (criterion: Criterion): void => {
  const oldIdx = evaluationCriteria.findIndex(c => c.id === criterion.id)
  if (oldIdx < 0) {
    throw 'can not find criterion'
  }
  evaluationCriteria.splice(oldIdx, 1, criterion)
}

const removeCriterion = (id: Criterion['id']): void => {
  const oldIdx = evaluationCriteria.findIndex(c => c.id === id)
  if (oldIdx < 0) {
    throw 'can not find criterion'
  }
  evaluationCriteria.splice(oldIdx, 1)

  offers.forEach(o => {
    const cidx = o.evaluationScores.findIndex(e => e.criterionId === id)
    if (cidx > -1) {
      o.evaluationScores.splice(cidx, 1)
    }
  })
}

export {
  offers,
  evaluationCriteria,

  saveScores,
  addCriterion,
  updateCriterion,
  removeCriterion
}
