<template>
<div>
<h3 class="va-h3">Top 5</h3>
  <p>Selecione abaixo o tipo de serviço, o serviço e a data de início e fim do período</p>
</div>
  <div style="width: 300px; display: flex; margin-top: 20px;">

    <div class="mr-3">
    <va-select
      v-model="pessoa"
      class="mt-3"
      label="Tipo de Serviço"
      :options="tipoPessoa"
    />
    </div>

    <div class="mr-3">
    <va-select
      v-model="value"
      class="mt-3"
      label="Serviço"
      :options="options"
      searchable
      highlight-matched-text
    />
    </div>

    <div class="mr-3">
      <va-date-input
        v-model="range"
        class="mt-3"
        :reset-on-close="false"
        label="Data de inicio e fim"
      />
    </div>

    <div style="display: flex; align-items: center;">

    <va-button
      icon-right="search"
      icon-color="#ffffff90"
      class="mr-3 mb-2 mt-3"
      style="border-radius: 0.25rem; align-self: flex-start;"
      round
    >Buscar
    </va-button>
    </div>

      </div>
      <div style="margin-top: 30px;">
      <Table class="mt-3" style="width: auto;"></Table>
    </div>

</template>

<script>
import Table from '../ranking/Top5Table.vue'


const tipoPessoa = ["Física", "Jurídica"]
const datePlusDay = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};
const nextWeek = datePlusDay(new Date(), 7);

export default {
  name: "Variations",
  components: {
    Table
  },
  data() {
    return {
      options: [
        "one",
        "two",
        "three",
      ],
      tipoPessoa,
      single: new Date(),
      range: { start: new Date(), end: nextWeek },

    };
  },
};
</script>
