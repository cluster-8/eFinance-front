<template>
    <div class="row">
      <va-select
        v-model="sortBy"
        class="flex flex-col mb-2 md6"
        label="Sort by"
        placeholder=""
        :options="sortByOptions()"
      />
  
      <va-select
        v-model="sortingOrder"
        class="flex flex-col mb-2 md6"
        label="Sorting order"
        :options="sortingOrderOptions"
        :value-by="(option) => option.value"
      />
    </div>
  
    <va-data-table
      v-model:sort-by="sortBy"
      v-model:sorting-order="sortingOrder"
      :items="tarifas"
      :columns="columns"
      :hoverable="true"
      striped="isTableStriped"
      @sorted="
        sortingOrderEmitted = $event.sortingOrder,
        sortByEmitted = $event.sortBy
      "
    />
  
    <va-alert
      class="mt-3"
      color="info"
      outline
    >
      <span v-if="sortingOrder">
        Sorted items order (showing id):
        <va-chip v-show="!!sortedRowsEmitted.length">{{
          sortedRowsEmitted.join(" --> ")
        }}</va-chip>
        <va-chip v-show="!!sortingOrderEmitted">{{
          sortingOrderEmitted
        }}</va-chip>
        <va-chip v-show="!!sortByEmitted">{{ sortByEmitted }}</va-chip>
      </span>
      <span v-else>
        Unsorted items order (showing id):
        <va-chip v-show="!!sortedRowsEmitted.length">{{
          sortedRowsEmitted.join(", ")
        }}</va-chip>
      </span>
    </va-alert>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  

  export default defineComponent({
    props: {
      tarifas: {
        Array
      }
    },
    data() {
        
      const columns = [
        { key: "servico.nome", name:'Serviço', label:'Serviço', sortable: true, sortingOptions: ["desc", "asc"] },
        { key: "valorMaximo", name:'Valor Máximo', label:'Valor Máximo em R$', sortable: true },
        { key: "dataVigencia", name:'Data de Vigência', label:'Data de Vigência', sortable: true },
        { key: "unidade", name:'Unidade', sortable: true },
        { key: "periodicidade", name: 'Periodicidade', sortable: true },
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
  