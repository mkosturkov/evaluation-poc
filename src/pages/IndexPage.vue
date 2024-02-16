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
          <q-btn>Add Criterion</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="row">
      <q-card>
        <q-card-section>
          Add Criterion
        </q-card-section>
        <q-card-section>
          <div class="row">
            <q-input model-value="" label="Name"></q-input>
          </div>
          <div style="margin-top: 20px">
            Weight
          </div>
          <div style="padding: 30px 0" class="row">
            <q-slider model-value="0" label label-always min="-50" max="50"></q-slider>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn>Close</q-btn>
          <q-btn>Add Criterion</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="row">
      <criteria-list
        :criteria="evaluationCriteria"
        @add-new="onAddCriterion"
        @edit="onEditCriterion"
        @remove="onEditCriterion"
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

const evaluationCriteria = [
  {
    id: 'a',
    name: 'Quality'
  },
  {
    id: 'b',
    name: 'Delivery Speed'
  },
  {
    id: 'c',
    name: 'Discount'
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

const onAddCriterion = () => console.log('add criterion')
const onRemoveCriterion = (id: string) => console.log('remove criterion', id)
const onEditCriterion = (id: string) => console.log('edit criterion', id)
</script>
