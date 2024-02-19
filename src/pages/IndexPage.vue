<template>
  <q-page>
    <q-dialog v-model="scoresDialog">
      <EvaluationForm
        :scores="scoresDialogScores"
        :criteria="evaluationCriteria"
      />
    </q-dialog>
    <q-dialog v-model="criterionDialog">
      <CriterionEditForm
        :criterion="currentCriterion"
        :max-weight="criterionMaxWeight"
        @save="onSaveCriterion"
        @cancel="onCloseCriterionDialog"
      />
    </q-dialog>
    <div class="row">
      <criteria-list
        :criteria="evaluationCriteria"
        @add-new="onAddCriterion"
        @edit="onEditCriterion"
        @remove="onRemoveCriterion"
      />
    </div>
    <div class="row">
      <offers-table :offers="offers" :criteria="evaluationCriteria" @offer-selected="onOfferSelected" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
  import OffersTable from 'components/OffersTable.vue';
  import CriteriaList from 'components/CriteriaList.vue';
  import { computed, ref } from 'vue';
  import CriterionEditForm from 'components/CriterionEditForm.vue';
  import EvaluationForm from 'components/EvaluationForm.vue';

    const evaluationCriteria = [
    {
      id: 'a',
      name: 'Quality',
      weight: 2.5
    },
    {
      id: 'b',
      name: 'Delivery Speed',
      weight: 3.6
    },
    {
      id: 'c',
      name: 'Discount',
      weight: 2.2
    }
  ]

  const offers: InstanceType<typeof OffersTable>["$props"] = [
    {
      id: 'o1',
      offerName: 'Big Store of Stores',
      evaluationScores: [
        {
          criterionId: 'a',
          score: 2.8
        },
        {
          criterionId: 'b',
          score: 3.5
        },
        {
          criterionId: 'c',
          score: 0
        }
      ]
    },
    {
      id: 'o2',
      offerName: 'Pappa Beh\'s Merchandise',
      evaluationScores: [
        {
          criterionId: 'a',
          score: 1.9
        },
        {
          criterionId: 'b',
          score: 4
        },
        {
          criterionId: 'c',
          score: 3
        }
      ]
    },
    {
      id: 'o3',
      offerName: 'All You Need Goods',
      evaluationScores: [
        {
          criterionId: 'a',
          score: 4
        },
        {
          criterionId: 'b',
          score: -1.3
        },
        {
          criterionId: 'c',
          score: 1
        }
      ]
    },
    {
      id: 'o4',
      offerName: 'Flanders & Sons co.',
      evaluationScores: [
        {
          criterionId: 'a',
          score: 2
        },
        {
          criterionId: 'b',
          score: 0
        },
        {
          criterionId: 'c',
          score: 5
        }
      ]
    }
  ]

  const scoresDialog = ref(false)
  const scoresDialogScores = ref(offers[0].evaluationScores)

  const onOfferSelected = (id: string) => {
    scoresDialog.value = true
    scoresDialogScores.value = offers.value.find((o: any) => o.id === id)?.evaluationScores
  }

  const criterionDialog = ref(false)
  const newCriterion = () => ({
    name: '',
    weight: 0
  })
  const currentCriterion = ref(newCriterion())
  const criterionMaxWeight = computed(() => 50 - evaluationCriteria.reduce((acc, cur) => acc + cur.weight, 0))

  const onAddCriterion = () => {
    currentCriterion.value = newCriterion()
    criterionDialog.value = true
  }
  const onEditCriterion = (id: string) => {
    const toEdit = evaluationCriteria.find((c) => id === c.id)
    if (!toEdit) {
      throw 'can not find criterion'
    }
    currentCriterion.value = toEdit
    criterionDialog.value = true
  }
  const onSaveCriterion = (criterion: any) => {
      console.log('saving criterion', criterion)
  }
  const onCloseCriterionDialog = () => {
      criterionDialog.value = false
  }
  const onRemoveCriterion = (id: string) => console.log('remove criterion', id)

</script>
