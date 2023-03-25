<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>Selecione abaixo o tipo de serviço e a instituição financeira para visualizar as taxas de serviços</p>

  <div style="width: 300px; display: flex; margin-top: 1.2rem;">

    <div class="mr-3">

      <va-select v-model="pessoa" class="mt-3" label="Tipo de Serviço:" :rules="selectRules" :options="tipoPessoa" />
    </div>

    <div class="mr-3">

      <va-select v-model="banco" class="mt-3" label="Busque a Instituição" :options="options"
        :text-by="(option) => option.nome" searchable />
      
    </div>
    <!-- 
    <va-button
      icon-right="search"
      icon-color="#ffffff90"
      class="mr-3 mb-2 mt-3"
      style="border-radius: 0.25rem; align-self: flex-start;"
      @click="fetchTarifas(banco)"
      >
      Buscar 
    </va-button>
    
     -->

    <h1 v-if="!error">Dados não encontrados.</h1>
  </div>



  <Table :tarifas="tarifas" style="margin-top: 2rem;" />
</template>



<script>

import Table from '../dashboard/DashboardTable.vue'
import api from '../../../services/api'
import { onMounted, ref, toRaw, watch } from 'vue';

const tarifas = ref()
const instituicoes = ref([])
const tipoPessoa = ["Física", "Jurídica"]
const pessoa = ref()
const banco = ref()
const error = ref(false)

const fetchInstituicoes = async () => {
  let response = await api.get('instituicoes')
  instituicoes.value = response.data
}

const fetchTarifas = async (banco) => {
  if (!banco) return
  console.log(banco)
  let id = toRaw(banco.id)
  let response = await api.get(`instituicao/tarifas/${id}`)
  tarifas.value = response.data
}

const handleSubmit = (pessoa, banco) => {
  console.log(pessoa)
  console.log(banco)
}

export default {
  components: {
    Table
  },
  data() {
    const options = instituicoes
    return {
      banco,
      options,
      pessoa,
      tipoPessoa,
      handleSubmit,
      fetchTarifas,
      tarifas,
      error
    };
  },
  setup() {
    watch(banco, (newValue) => {
      fetchTarifas(newValue)
    })
    onMounted(() => {
      fetchInstituicoes()
    })
  },


};
</script>

