<template>
  <q-page>
    <q-dialog v-model="scoresDialog">
      <EvaluationFormHOC
        :offer-id="selectedOfferId"
        @complete="closeScoresDialog"
      />
    </q-dialog>
    <q-dialog v-model="isCriterionDialogOpen">
      <CriterionEditFormHOC
        :criterion-id="selectedCriterionId"
        @complete="closeCriterionDialog"
      />
    </q-dialog>
    <div class="row">
      <criteria-list
        :criteria="evaluationCriteria"
        @add-new="onAddCriterion"
        @edit="onEditCriterion"
        @remove="removeCriterion"
      />
    </div>
    <div class="row">
      <offers-table :offers="offers" :criteria="evaluationCriteria" @offer-selected="onOfferSelected" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
  import { offers, evaluationCriteria, removeCriterion } from 'src/state';
  import { Criterion, Offer } from 'src/types';
  import OffersTable from 'components/OffersTable.vue';
  import CriteriaList from 'components/CriteriaList.vue';
  import { computed, ref } from 'vue';
  import CriterionEditFormHOC from 'components/CriterionEditFormHOC.vue';
  import EvaluationFormHOC from 'components/EvaluationFormHOC.vue';


  const selectedOfferId = ref<Offer['id'] | null>(null)
  const scoresDialog = computed(() => selectedOfferId.value !== null)
  const onOfferSelected = (id: Offer['id']) => {
    selectedOfferId.value = id
  }
  const closeScoresDialog = () => {
    selectedOfferId.value = null
  }

  const selectedCriterionId = ref<Criterion['id']|null>(null);
  const isCriterionDialogOpen = ref(false)
  const onAddCriterion = () => {
    selectedCriterionId.value = null
    isCriterionDialogOpen.value = true
  }
  const onEditCriterion = (id: Criterion['id']) => {
    selectedCriterionId.value = id
    isCriterionDialogOpen.value = false
  }
  const closeCriterionDialog = () => selectedCriterionId.value = null


</script>
