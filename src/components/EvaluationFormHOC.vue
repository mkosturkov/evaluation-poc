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

  const scores = computed(() => offers.find(o => o.id === props.offerId) || [])

  const scoresLoading = ref(false)

  const onSaveScores = (scores: EvaluationScore[]) => {
    scoresLoading.value = true
    setTimeout(
      () => {
        scoresLoading.value = false;
        saveScores(props.offerId, scores)
        emit('complete')
      },
      500
    )
  }

</script>
