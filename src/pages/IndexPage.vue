<template>
  <q-page>
    <q-dialog v-model="scoresDialog">
      <EvaluationForm
        :scores="scoresDialogScores"
        :criteria="evaluationCriteria"
        :loading="scoresLoading"
        @cancel="closeScoresDialog"
        @save="saveScores"
      />
    </q-dialog>
    <q-dialog v-model="criterionDialog">
      <CriterionEditForm
        :criterion="currentCriterion"
        :max-weight="criterionMaxWeight"
        :loading="criterionLoading"
        :error="criterionError"
        @save="onSaveCriterion"
        @cancel="closeCriterionDialog"
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
  import { offers, evaluationCriteria, addCriterion, removeCriterion, updateCriterion, saveScores as saveStateScores } from 'src/state';
  import { NewCriterion, Criterion, EvaluationScore, Offer } from 'src/types';
  import OffersTable from 'components/OffersTable.vue';
  import CriteriaList from 'components/CriteriaList.vue';
  import { computed, reactive, ref } from 'vue';
  import CriterionEditForm from 'components/CriterionEditForm.vue';
  import EvaluationForm from 'components/EvaluationForm.vue';


  const scoresDialog = ref(false)
  const scoresDialogScores = ref<EvaluationScore[]>([])
  const scoresLoading = ref(false)
  let selectedOfferId: Offer['id'] = ''

  const onOfferSelected = (id: Offer['id']) => {
    scoresDialog.value = true
    selectedOfferId = id
    const selectedOffer = offers.find((o) => o.id === id)
    if (!selectedOffer) {
      throw 'could not find offer'
    }
    scoresDialogScores.value = selectedOffer.evaluationScores
  }
  const saveScores = (scores: EvaluationScore[]) => {
    console.log('saving scores', scores)
    scoresLoading.value = true
    setTimeout(
      () => {
        scoresLoading.value = false;
        saveStateScores(selectedOfferId, scores)
        closeScoresDialog()
      },
      500
    )
  }
  const closeScoresDialog = () => {
    scoresDialog.value = false
  }

  const criterionDialog = ref(false)
  const criterionLoading = ref(false)
  const criterionError = ref<string|false>(false)
  const newCriterion = (): NewCriterion => ({
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

  const onSaveCriterion = (criterion: NewCriterion | Criterion) => {
    console.log('saving criterion', criterion)
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
          closeCriterionDialog()
        }
      },
      500
    )
  }
  const closeCriterionDialog = () => {
    criterionDialog.value = false
    criterionError.value = false
  }
  const onRemoveCriterion = removeCriterion

</script>
