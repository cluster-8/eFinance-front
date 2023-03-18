<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>Selecione abaixo o tipo de serviço e a instituição financeira para visualizar as taxas de serviços</p>

  <div style="width: 300px;">

    <va-form
      ref="form"
      @validation="validation = $event"
    >

    <va-select
        v-model="selectValue"
        class="mt-3"
        label="Tipo de Serviço:"
        :rules="selectRules"
        :options="options"
      />


    <va-input
      v-model="value"
      class="mt-3"
      label="Busque a Instituição"
    >
      <template #appendInner>
        <va-icon name="search" />
      </template>
    </va-input>
      
      
    </va-form>

    <va-alert
      v-if="validation !== null"
      class="mt-6"
      border="left"
    >
      <span>
        Validate form:
        <va-chip>{{ validation }}</va-chip>
      </span>
    </va-alert>
  </div>

  <Table style="margin-top: 2rem;"/>
</template>



<script>

import Table from '../dashboard/DashboardTable.vue'

export default {
  components: {
    Table
  },
  data() {
    return {
      value: "Itaú - Unibanco",
      inputValue: "",
      selectValue: "Pessoa Física",
      inputDate: undefined,
      validation: null,
      options: ["Pessoa Física", "Pessoa Jurídica"],
      inputRules: [(value) => value === "Ben" || "test"],
      //selectRules: [(value) => value === "Minsk" || "Should be Minsk"],
      dateRules: [(value) => !!value || "Should be date"],
    };
  },
};


</script>
