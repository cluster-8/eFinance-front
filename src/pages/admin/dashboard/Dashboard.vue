<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>Selecione abaixo o tipo de serviço e a instituição financeira para visualizar as taxas de serviços</p>
  
  <div style="width: 300px; display: flex; flex-direction: column;">

    
    <va-select
      v-model="pessoa"
      class="mt-3"
      label="Tipo de Serviço:"
      :rules="selectRules"
      :options="tipoPessoa"
    />

      
   
    <va-select
      v-model="banco"
      class="mb-6 mt-2"
      label="Busque a Instituição"
      :options="options"
      :text-by="(option) => option.nome"
      searchable
      
    />

    <va-button
      icon-right="search"
      icon-color="#ffffff90"
      class="mr-3 mb-2 mt-3"
      style="border-radius: 0.25rem; align-self: flex-start;"
      @click="handleSubmit(pessoa, value)"
    >
      Buscar 
    </va-button>


  </div>



  <Table style="margin-top: 2rem;"/>
</template>



<script>

import Table from '../dashboard/DashboardTable.vue'
import api from '../../../services/api'
import { ref } from 'vue';
import { onMounted } from 'vue';

const instituicoes = ref([])
const tipoPessoa = ["Física", "Jurídica"]
const pessoa = ref()

const fetchInstituicoes = async () => {
  let response = await api.get('instituicoes')
  instituicoes.value = response.data
}

const handleSubmit = (pessoa, value) => {
  console.log(pessoa)
  console.log(value)
}

export default {
  components: {
    Table
  },
  data() {
    const options = instituicoes
    return {
      banco: options[0],
      options,
      pessoa,
      tipoPessoa,
      handleSubmit
    };
  },
  setup() {
    onMounted(() => {
      fetchInstituicoes()
    })  

  },

  
};
</script>
