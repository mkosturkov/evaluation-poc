<template>
  <q-card>
    <q-card-section>
      {{ isNew ? 'Add' : 'Edit' }} Criterion
    </q-card-section>
    <q-card-section>
      <div class="row">
        <q-input v-model="criterion.name" label="Name"></q-input>
      </div>
      <div style="margin-top: 20px">
        Weight
      </div>
      <div style="padding: 30px 0" class="row">
        <q-slider
          v-model="criterion.weight"
          :min="minWeight"
          :max="props.maxWeight"
          label
          label-always
        />
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="onCancel">Cancel</q-btn>
      <q-btn @click="onSave">Save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">

import { computed, reactive } from 'vue';

  type CriterionValue = {
    id?: string
    name: string
    weight: string
  }

  const props = defineProps<{
    criterion: CriterionValue,
    maxWeight: number
  }>()

  const isNew = computed(() => props.criterion.id === undefined)
  const minWeight = computed(() => props.maxWeight * -1)

  const criterion = reactive(props.criterion)

  const emit = defineEmits<{
    (e: 'save', criterion: CriterionValue): void
    (e: 'cancel'): void
  }>()

  const onSave = () => emit('save', criterion)
  const onCancel = () => emit('cancel')


</script>
