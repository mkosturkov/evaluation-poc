import { reactive } from 'vue';
import { Criterion, Offer } from 'components/types';

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
  ]
)

export {
  offers,
  evaluationCriteria
}
