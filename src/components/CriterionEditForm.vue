<template>
  <q-card>
    <q-card-section>
      {{ isNew ? 'Add' : 'Edit' }} Criterion
    </q-card-section>
    <q-card-section>
      <div class="row">
        <q-input
          v-model="criterion.name"
          label="Name"
          :error="hasError"
          :error-message="errorMessage"
        />
      </div>
      <div style="margin-top: 20px">
        Weight
      </div>
      <div style="padding: 30px 0" class="row">
        <q-slider
          v-model="criterion.weight"
          :min="0"
          :max="props.maxWeight"
          label
          label-always
        />
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="onCancel">Cancel</q-btn>
      <q-btn @click="onSave" :loading="props.loading">Save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  import { NewCriterion, Criterion } from 'src/types';
  import { computed, reactive } from 'vue';

  const props = defineProps<{
    criterion: NewCriterion | Criterion
    maxWeight: number
    loading: boolean
    error: string | false
  }>()

  const isNew = computed(() => props.criterion.id === undefined)
  const hasError = computed(() => props.error !== false)
  const errorMessage = computed(() => props.error || '')
  const criterion = reactive(props.criterion)

  const emit = defineEmits<{
    (e: 'save', criterion: NewCriterion | Criterion): void
    (e: 'cancel'): void
  }>()

  const onSave = () => emit('save', criterion)
  const onCancel = () => emit('cancel')


</script>
