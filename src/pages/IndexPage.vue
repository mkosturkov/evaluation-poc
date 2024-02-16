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
      <q-chip color="primary" outline> + Add Criterion</q-chip>
      <q-chip v-for="criterion in evaluationCriteria" :key="criterion.id" removable color="primary" text-color="white">
        {{ criterion.name }}
      </q-chip>
    </div>
    <div class="row">
      <q-table :columns="tableColumns" :rows="tableRows"></q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EvaluationPage',

  setup() {
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

    const tableColumns = [
      {
        name: 'offer-name',
        label: 'Offer Name',
        field: 'offerName'
      },
      {
        name: 'quality',
        label: 'Quality',
        field: 'quality'
      },
      {
        name: 'deliverySpeed',
        label: 'Delivery Speed',
        field: 'deliverySpeed'
      },
      {
        name: 'discount',
        label: 'Discount',
        field: 'discount'
      }
    ]

    const tableRows = [
      {
        offerName: 'Big Store of Stores',
        quality: 2.8,
        deliverySpeed: 3.5,
        discount: 0
      },
      {
        offerName: 'Pappa Beh\'s Merchandise',
        quality: 1.9,
        deliverySpeed: 4,
        discount: 3
      },
      {
        offerName: 'All You Need Goods',
        quality: 4,
        deliverySpeed: -1.3,
        discount: 1
      },
      {
        offerName: 'Flanders & Sons co.',
        quality: 2,
        deliverySpeed: 0,
        discount: 5
      }
    ]

    return { tableColumns, tableRows, evaluationCriteria: evaluationCriteria }
  }
});
</script>
