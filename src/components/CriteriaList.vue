<template>
  <q-chip
    @click="onNewClick"
    label=" + Add Criterion"
    clickable
    color="primary"
    outline
  />
  <q-chip
    v-for="criterion in props.criteria"
    :key="criterion.id"
    :label="criterion.name"
    @click="onCriterionClick(criterion.id)"
    @remove="onRemoveClick(criterion.id)"
    clickable
    removable
    color="primary"
    text-color="white"
  />
</template>


<script setup lang="ts">

  const props = defineProps<{
    criteria: Array<{
      id: string
      name: string
    }>
  }>()

  const emit = defineEmits<{
    (e: 'add-new'): void
    (e: 'edit', id: string): void
    (e: 'remove', id: string): void
  }>()

  const onNewClick = () => emit('add-new')
  const onCriterionClick = (id: string) => emit('edit', id)
  const onRemoveClick = (id: string) => emit('remove', id)

</script>
