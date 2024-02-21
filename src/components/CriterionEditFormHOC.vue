<template>
  <CriterionEditForm
    :criterion="currentCriterion"
    :max-weight="criterionMaxWeight"
    :loading="criterionLoading"
    :error="criterionError"
    @save="onSaveCriterion"
    @cancel="onCancel"
  />
</template>

<script setup lang="ts">
  import CriterionEditForm from 'components/CriterionEditForm.vue';
  import { computed, ref } from 'vue';
  import { Criterion, NewCriterion } from 'src/types';
  import store from 'src/state';

  const props = defineProps<{
    criterionId: Criterion['id'] | null
  }>()

  const currentCriterion = computed(() => {
    return store.evaluationCriteria.value.find(c => c.id === props.criterionId) || {
      name: '',
      weight: 0
    }
  })

  const emit = defineEmits<{
    (e: 'complete'): void
  }>()

  const criterionLoading = ref(false)
  const criterionError = ref<string|false>(false)
  const criterionMaxWeight = computed(() => 50 - store.evaluationCriteria.value.reduce((acc, cur) => acc + cur.weight, 0))

  const onSaveCriterion = async (criterion: NewCriterion | Criterion) => {
    criterionLoading.value = true
    criterionError.value = false
    type CriterionGuard = {
      (c: Criterion): c is Criterion
      (c: NewCriterion): c is Criterion
    }

    const isCriterion: CriterionGuard = (c): c is Criterion => c.id !== undefined

    try {
      if (isCriterion(criterion)) {
        await store.updateCriterion(criterion)
      } else {
        await store.addCriterion(criterion)
      }
      emit('complete')
    } catch (e: unknown) {
      if (e instanceof Error) {
        criterionError.value = e.message
      } else {
        throw e
      }
    } finally {
      criterionLoading.value = false
    }
  }

  const onCancel = () => emit('complete')

</script>
