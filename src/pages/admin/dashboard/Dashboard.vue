<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>Selecione abaixo o tipo de serviço e a instituição financeira para visualizar as taxas de serviços</p>
  
  <div style="width: 300px;">

    
    <!-- <va-select
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
    </va-input> -->
      
   
    <va-select
      v-model="value"
      class="mb-6"
      label="Default"
      :options="options"
      :text-by="(option) => option.nome"
      searchable
    />
    
  </div>

  <Table style="margin-top: 2rem;"/>
</template>



<script>

import Table from '../dashboard/DashboardTable.vue'
import api from '../../../services/api'
import { ref } from 'vue';
import { onMounted } from 'vue';

const instituicoes = ref([])


const fetchInstituicoes = async () => {
      let response = await api.get('instituicoes')
      instituicoes.value = response.data
    }

export default {
  components: {
    Table
  },
  data() {
    // const options = [
    //   { "id": 1, "nome": "Teste 1"},
    //   { "id": 2, "nome": "Teste 2"},
    //   { "id": 3, "nome": "Teste 3"},
    // ]
    const options = instituicoes
    return {
      // value: [(value) => value.instituicoes.name],
      // inputValue: "",
      // selectValue: "Pessoa Física",
      // inputDate: undefined,
      // options: ["Pessoa Física", "Pessoa Jurídica"],
      // inputRules: [(value) => value === "Ben" || "test"],
      // //selectRules: [(value) => value === "Minsk" || "Should be Minsk"],
      // dateRules: [(value) => !!value || "Should be date"],
      value: options[0],
      options,
    };
  },
  setup() {
    onMounted(() => {
      fetchInstituicoes()
    })  

    // const instituicoes = ref([])
    
    // const fetchInstituicoes = async () => {
    //   let response = await api.get('instituicoes')
    //   // instituicoes.value = response.data
    //   // console.log(response)
    //   return response.data
    // }
    // onMounted(fetchInstituicoes)
    // return {instituicoes}
  },

  
};
</script>
