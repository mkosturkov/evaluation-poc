<template>
  <EvaluationForm
    :scores="scores"
    :criteria="store.evaluationCriteria.value"
    :loading="scoresLoading"
    @cancel="onCancel"
    @save="onSaveScores"
  />
</template>

<script setup lang="ts">

  import store from 'src/state';
  import { Offer } from 'src/types';
  import EvaluationForm from 'components/EvaluationForm.vue';
  import { useEvaluationFormModel } from 'components/EvaluationFormModel';

  const props = defineProps<{
    offerId: Offer['id'] | null
  }>()

  const emit = defineEmits<{
    (e: 'complete'): void
  }>()

  const { scores, scoresLoading, onSaveScores, onCancel } = useEvaluationFormModel(props, store, emit)

</script>
