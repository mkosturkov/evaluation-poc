<template>
  <EvaluationForm
    :scores="scores"
    :criteria="evaluationCriteria"
    :loading="scoresLoading"
    @cancel="emit('complete')"
    @save="onSaveScores"
  />
</template>

<script setup lang="ts">

  import { evaluationCriteria, offers, saveScores } from 'src/state';
  import { EvaluationScore, Offer } from 'src/types';
  import { computed, ref } from 'vue';
  import EvaluationForm from 'components/EvaluationForm.vue';

  const props = defineProps<{
    offerId: Offer['id'] | null
  }>()

  const emit = defineEmits<{
    (e: 'complete'): void
  }>()

  const scores = computed(() => offers.value.find(o => o.id === props.offerId)?.evaluationScores || [])

  const scoresLoading = ref(false)

  const onSaveScores = async (scores: EvaluationScore[]) => {
    if (props.offerId !== null) {
      scoresLoading.value = true
      await saveScores(props.offerId, scores)
      scoresLoading.value = false;
      emit('complete')
    }
  }

</script>
