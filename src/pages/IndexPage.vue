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
        :criteria="store.evaluationCriteria.value"
        @add-new="onAddCriterion"
        @edit="onEditCriterion"
        @remove="store.removeCriterion"
      />
    </div>
    <div class="row">
      <offers-table :offers="store.offers.value" :criteria="store.evaluationCriteria.value" @offer-selected="onOfferSelected" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
  import store from 'src/state';
  import { Criterion, Offer } from 'src/types';
  import OffersTable from 'components/OffersTable.vue';
  import CriteriaList from 'components/CriteriaList.vue';
  import { computed, onMounted, ref } from 'vue';
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
    isCriterionDialogOpen.value = true
  }
  const closeCriterionDialog = () => {
    selectedCriterionId.value = null
    isCriterionDialogOpen.value = false
  }

  onMounted(store.init)

</script>
