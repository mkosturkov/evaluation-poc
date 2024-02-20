<template>
  <q-table :columns="columns" :rows="rows" @row-click="onRowClicked"></q-table>
</template>

<script lang="ts" setup>
  import { Offer } from 'components/types';

  const props = defineProps<{
    offers: Offer[],
    criteria: Array<{
      id: string,
      name: string
    }>
  }>()

  const emit = defineEmits<{
    (e: 'offer-selected', id: string): void
  }>()

  const makeEvaluationColumnName = (id: string) => `score-${id}`

  const columns = [
    {
      name: 'offerName',
      label: 'Offer',
      field: 'offerName'
    }
  ].concat(props.criteria.map(c => ({
    name: c.id,
    label: c.name,
    field: makeEvaluationColumnName(c.id),
    format: (v: any) => `${v}%`
  })))

  const rows = props.offers.map(o => ({
    id: o.id,
    offerName: o.offerName,
    ...Object.fromEntries(
      o.evaluationScores.map(es => [
        makeEvaluationColumnName(es.criterionId),
        es.score
      ]),

    )
  }))

  const onRowClicked = (e: Event, row: {id: string}) => emit('offer-selected', row.id)
</script>
