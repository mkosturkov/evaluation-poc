<template>
  <CriterionEditForm
    :criterion="currentCriterion"
    :max-weight="criterionMaxWeight"
    :loading="criterionLoading"
    :error="criterionError"
    @save="onSaveCriterion"
    @cancel="emit('complete')"
  />
</template>

<script setup lang="ts">
  import CriterionEditForm from 'components/CriterionEditForm.vue';
  import { computed, ref } from 'vue';
  import { Criterion, NewCriterion } from 'src/types';
  import { addCriterion, evaluationCriteria, updateCriterion } from 'src/state';

  const props = defineProps<{
    criterionId: Criterion['id'] | null
  }>()

  const currentCriterion = computed(() => {
    return evaluationCriteria.find(c => c.id === props.criterionId) || {
      name: '',
      weight: 0
    }
  })

  const emit = defineEmits<{
    (e: 'complete'): void
  }>()

  const criterionLoading = ref(false)
  const criterionError = ref<string|false>(false)
  const criterionMaxWeight = computed(() => 50 - evaluationCriteria.reduce((acc, cur) => acc + cur.weight, 0))

  const onSaveCriterion = (criterion: NewCriterion | Criterion) => {
    criterionLoading.value = true
    criterionError.value = false
    setTimeout(
      () => {
        criterionLoading.value = false
        if (criterion.name.trim() === '') {
          criterionError.value = 'Criterion name can not be empty'
        } else {

          type CriterionGuard = {
            (c: Criterion): c is Criterion
            (c: NewCriterion): c is Criterion
          }

          const isCriterion: CriterionGuard = (c): c is Criterion => c.id !== undefined

          if (isCriterion(criterion)) {
            updateCriterion(criterion)
          } else {
            addCriterion(criterion)
          }
          emit('complete')
        }
      },
      500
    )
  }

</script>
