<template>
  <q-card>
    <q-card-section>
      Total Score: {{ totalScore }}%
    </q-card-section>
    <q-card-section>
      <template v-for="score in scores" :key="score.id">
        <div  style="margin-top: 20px">
          {{ score.name }}
        </div>
        <div style="padding: 30px 0" class="row">
          <q-slider v-model="score.score" label label-always min="-50" max="50"></q-slider>
        </div>
      </template>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="onCloseClick">Close</q-btn>
      <q-btn @click="onSaveClick">Save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue';

  const props = defineProps<{
    criteria: Array<{
      id: string
      name: string
      weight: number
    }>
    scores: Array<{
      criterionId: string
      score: number
    }>
  }>()

  const scores = ref(
    props.criteria.map(c => ({
      ...c,
      score: props.scores.find(s => s.criterionId === c.id)?.score || 0,
    }))
  )

  const totalScore = computed(
    () => scores.value.reduce((acc, cur) => acc + cur.score * cur.weight, 0) * 100
  )

  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'save', scores: Array<{criterionId: string, score: number}>): void
  }>()

  const onCloseClick = () => emit('cancel')
  const onSaveClick = () => emit('save', scores.value.map(s => ({ criterionId: s.id, score: s.score })))

</script>

