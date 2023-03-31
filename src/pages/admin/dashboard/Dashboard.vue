<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>Selecione abaixo o tipo de serviço e a instituição financeira para visualizar as taxas de serviços</p>
  
  <div style="display: flex; margin-top: 1.2rem; max-width: 30rem;">
    <div class="mr-3" style="max-width: 10rem;">
      <va-select 
        v-model="tipoServico" 
        class="mt-3" 
        label="Tipo de Serviço:" 
        :options="tipos"
      />
    </div>
    <div class="mr-3" style="flex-grow: 1;">
      <va-select 
        v-model="banco" 
        class="mt-3" 
        label="Busque a Instituição" 
        :options="instituicoes"
        :text-by="(option) => option.nome" searchable />
    </div>
  </div> 
  <div>
    <va-alert
      v-if="error"
      icon="info"
      class="mb-3 mt-3"
      :description="error"
    />
  </div>

  <div style="position: absolute; top: 50%; left: 50%;"> 
      <scaling-squares-spinner
        v-if="isLoading"
        :animation-duration="1250"
        :size="150"
        color="#154EC1"
        />
    </div>

  <div style="margin-top: 2rem;">
    <Table
      v-if="isVisible"
      :tarifas="!error ? tarifas : ''"
    ></Table>
  </div>
</template>



<script lang="ts">
import { ScalingSquaresSpinner } from 'epic-spinners'
import Table from '../dashboard/DashboardTable.vue'
import api from '../../../services/api'
import { onBeforeMount, ref, toRaw } from 'vue';

const tarifas = ref()
const instituicoes = ref([])
const tipoServico = ref<'Física' | 'Jurídica'>('Física')
const tipos = ['Física', 'Jurídica']
const banco = ref()
const error = ref(false)
const isVisible = ref(true)
const isLoading = ref(false)

const fetchInstituicoes = async () => {
  isLoading.value = true
  let response = await api.get('instituicoes')
  instituicoes.value = response.data
  isLoading.value = false
}

const fetchTarifas = async (banco) => {
  isLoading.value = true
  if (!banco) return
  let id = toRaw(banco.id)
  try {
    let response = await api.get(`instituicao/tarifas/${id}?tipo=${tipoServico.value.charAt(0)}`)
    tarifas.value = response.data
    error.value = false
    isLoading.value = false
    isVisible.value = true
    
  } catch (e) {
    isLoading.value = false
    isVisible.value = false
    error.value = e.response.data.message;
  }
}

export default {
  components: {
    Table,
    ScalingSquaresSpinner
  },
  data() {
    return {
      banco,
      tipos,
      tipoServico,
      fetchTarifas,
      tarifas,
      instituicoes,
      error,
      isVisible,
      isLoading
    };
  },
  watch: {
    banco(newValue) {
      fetchTarifas(newValue)
    },
    tipoServico() {
      fetchTarifas(banco.value)
    }
   },
  setup() {
  
    onBeforeMount(() => {
      fetchInstituicoes()
      isVisible.value = false
    })
  },


};
</script>