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
          <q-slider v-model="score.score" label label-always :min="-100" :max="100"></q-slider>
        </div>
      </template>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="onCloseClick">Close</q-btn>
      <q-btn @click="onSaveClick" :loading="props.loading">Save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  import { Criterion, EvaluationScore } from 'components/types';
  import { computed, ref } from 'vue';

  const props = defineProps<{
    criteria: Criterion[]
    scores: EvaluationScore[]
    loading: boolean
  }>()

  const scores = ref(
    props.criteria.map(c => ({
      ...c,
      score: props.scores.find(s => s.criterionId === c.id)?.score || 0,
    }))
  )

  const totalScore = computed(
    () => scores.value.reduce((acc, cur) => acc + cur.score * cur.weight, 0)
  )

  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'save', scores: EvaluationScore[]): void
  }>()

  const onCloseClick = () => emit('cancel')
  const onSaveClick = () => emit('save', scores.value.map(s => ({ criterionId: s.id, score: s.score })))

</script>

