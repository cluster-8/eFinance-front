<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>Selecione abaixo o tipo de serviço e a instituição financeira para visualizar as taxas de serviços</p>
  
  <div style="width: 300px; display: flex; margin-top: 1.2rem;">
    <div class="mr-3">
      <va-select 
        v-model="pessoa" 
        class="mt-3" 
        label="Tipo de Serviço:" 
        :rules="selectRules" 
        :options="tipoPessoa"
      />
    </div>
    <div class="mr-3">
      <va-select 
        v-model="banco" 
        class="mt-3" 
        label="Busque a Instituição" 
        :options="options"
        :text-by="(option) => option.nome" searchable />
    </div>
  </div> 
  <div style="width: 400px;">
    <va-alert
      v-if="error"
      icon="info"
      class="mb-3 mt-3"
      :description="error"
    />
  </div>

  <div style="margin-top: 2rem;">
    <Table
      v-if="isVisible"
      :tarifas="!error ? tarifas : ''"
    ></Table>
  </div>
</template>



<script>
import { ScalingSquaresSpinner } from 'epic-spinners'
import Table from '../dashboard/DashboardTable.vue'
import api from '../../../services/api'
import { onMounted, ref, toRaw, watch } from 'vue';

const tarifas = ref()
const instituicoes = ref([])
const tipoPessoa = ["Física", "Jurídica"]
const pessoa = ref()
const banco = ref()
const error = ref(false)
const isVisible = ref(true)

const fetchInstituicoes = async () => {
  let response = await api.get('instituicoes')
  instituicoes.value = response.data
}

const fetchTarifas = async (banco) => {
  if (!banco) return
  console.log(banco)
  let id = toRaw(banco.id)
  try {
    let response = await api.get(`instituicao/tarifas/${id}`)
    isVisible.value = true
    tarifas.value = response.data
    error.value = false
  } catch (e) {
    isVisible.value = false
    error.value = e.response.data.message
  }
}


export default {
  components: {
    Table,
    ScalingSquaresSpinner
  },
  data() {
    const options = instituicoes
    return {
      banco,
      options,
      pessoa,
      tipoPessoa,
      fetchTarifas,
      tarifas,
      error,
      isVisible
    };
  },
  setup() {
    watch(banco, (newValue) => {
      fetchTarifas(newValue)
    })

    onMounted(() => {
      fetchInstituicoes()
      isVisible.value = false
    })
  },


};
</script>