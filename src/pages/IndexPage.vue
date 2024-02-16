<template>
  <q-page>
    <div class="row">
      <q-card>
        <q-card-section>
          Total Score: +2.5%
        </q-card-section>
        <q-card-section>
          <div style="margin-top: 20px">
            Quality
          </div>
          <div style="padding: 30px 0" class="row">
            <q-slider model-value="0" label label-always min="-50" max="50"></q-slider>
          </div>
          <div style="margin-top: 20px">
            Delivery Speed
          </div>
          <div style="padding: 30px 0" class="row">
            <q-slider model-value="0" label label-always min="-50" max="50"></q-slider>
          </div>
          <div style="margin-top: 20px">
            Discount
          </div>
          <div style="padding: 30px 0" class="row">
            <q-slider model-value="0" label label-always min="-50" max="50"></q-slider>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn>Close</q-btn>
          <q-btn>Save</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="row">
      <q-dialog v-model="criterionDialog">
        <CriterionEditForm
          :criterion="currentCriterion"
          :max-weight="criterionMaxWeight"
          @save="onSaveCriterion"
          @cancel="onCloseCriterionDialog"
        />
      </q-dialog>
    </div>
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
  const onOfferSelected = (id: string) => console.log(id)

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
