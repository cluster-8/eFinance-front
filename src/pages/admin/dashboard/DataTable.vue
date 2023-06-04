<template>
  <va-data-table
    v-model:sort-by="sortBy"
    v-model:sorting-order="sortingOrder"
    :items="tarifas"
    :columns="columns"
    :hoverable="true"
    :striped="true"
    @sorted="
      (sortingOrderEmitted = $event.sortingOrder),
        (sortByEmitted = $event.sortBy)
    "
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tarifas: {
      Array,
    },
  },
  data() {
    const columns = [
      {
        key: "servico.nome",
        name: "Serviço",
        label: "Serviço",
        sortable: true,
        sortingOptions: ["desc", "asc"],
      },
      {
        key: "valorMaximo",
        name: "Valor Máximo",
        label: "Valor Máximo (R$)",
        sortable: true,
        sortingFn: (a, b) => (a > b ? -1 : 1),
      },
      {
        key: "valorMinimo",
        name: "Valor Mínimo",
        label: "Valor Mínimo (R$)",
        sortable: true,
        sortingFn: (a, b) => (a > b ? -1 : 1),
      },
      {
        key: "dataVigencia",
        name: "Data de Vigência",
        label: "Data Vigência",
        sortable: true,
      },
      { key: "unidade", name: "Unidade", sortable: true },
      { key: "periodicidade", name: "Periodicidade", sortable: true },
    ];

    const sortingOrderOptions = [
      { text: "asc", value: "asc" },
      { text: "desc", value: "desc" },
      { text: "no sorting", value: null },
    ];

    return {
      columns,
      sortBy: "",
      sortingOrder: "asc",
      sortingOrderOptions,
      sortByEmitted: "",
      sortingOrderEmitted: "",
      sortedRowsEmitted: [],
    };
  },

  methods: {
    sortByOptions() {
      return this.columns
        .map(({ name, key, sortable }) => sortable && (name || key))
        .filter(Boolean);
    },
  },
});
</script>
