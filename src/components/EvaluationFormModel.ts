import { computed, Ref, ref } from 'vue';
import { EvaluationScore, Offer } from 'src/types';

export function useEvaluationFormModel(props: { offerId: Offer['id'] | null }, store: { offers: Ref<Offer[]>, saveScores: (offerId: Offer['id'], scores: EvaluationScore[]) => Promise<void> }, emit: (e: 'complete') => void ) {

  const scores = computed(() => store.offers.value.find(o => o.id === props.offerId)?.evaluationScores || [])

  const scoresLoading = ref(false)

  const onSaveScores = async (scores: EvaluationScore[]) => {
    if (props.offerId !== null) {
      scoresLoading.value = true
      await store.saveScores(props.offerId, scores)
      scoresLoading.value = false;
      emit('complete')
    }
  }

  const onCancel = () => emit('complete')

  return {
    scores,
    scoresLoading,
    onSaveScores,
    onCancel
  }

}
