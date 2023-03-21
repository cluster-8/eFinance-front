<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>Selecione abaixo o tipo de serviço e a instituição financeira para visualizar as taxas de serviços</p>
  
  <div style="width: 300px;">

    
    <va-select
      v-model="selectValue"
      class="mt-3"
      label="Tipo de Serviço:"
      :rules="selectRules"
      :options="options"
    />

    
    <va-input
    v-model="instituicoes[0]"
    class="mt-3"
    label="Busque a Instituição"
    >
    <template #appendInner>
        <va-icon name="search" />
      </template>
    </va-input>
      
   

    
  </div>

  <Table style="margin-top: 2rem;"/>
</template>



<script>

import Table from '../dashboard/DashboardTable.vue'
import api from '../../../services/api'
import { ref } from 'vue';
import { onMounted } from 'vue';


export default {
  components: {
    Table
  },
  data() {
    return {
      value: [(value) => value.instituicoes.name],
      inputValue: "",
      selectValue: "Pessoa Física",
      inputDate: undefined,
      options: ["Pessoa Física", "Pessoa Jurídica"],
      inputRules: [(value) => value === "Ben" || "test"],
      //selectRules: [(value) => value === "Minsk" || "Should be Minsk"],
      dateRules: [(value) => !!value || "Should be date"],
    };
  },
  setup() {
    const instituicoes = ref([])
    
    const fetchInstituicoes = async () => {
      let response = await api.get('instituicoes')
      instituicoes.value = response.data
      console.log(response)
    }
    onMounted(fetchInstituicoes)
    return {instituicoes}
  },

  
};

</script>
